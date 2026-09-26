/**
 * The QA Lab's coverage numbers come from qa-lab-coverage.json in the E2E
 * repository — generated from `playwright test --list` and kept current by that
 * repo's CI — read by the browser at the commit of the run being shown. This
 * keeps the Lab accurate without redeploying the API that serves run status.
 */
export type QaLabCoverage = {
  definedTests: number;
  executions: number;
  projects: number;
  categories: Array<{ name: string; defined: number; executions: number }>;
  browsers: Array<{ project: string; target: string; executions: number }>;
};

export const coverageFileUrl = (commit: string) =>
  `https://raw.githubusercontent.com/joaquinganan/portfolio-e2e-automation/${commit}/qa-lab-coverage.json`;

const isCount = (value: unknown) => Number.isInteger(value) && (value as number) >= 0;

export function isQaLabCoverage(value: unknown): value is QaLabCoverage {
  const c = value as QaLabCoverage;
  return Boolean(c) && isCount(c.definedTests) && isCount(c.executions) && isCount(c.projects) &&
    Array.isArray(c.categories) &&
    c.categories.every((x) => typeof x?.name === "string" && isCount(x.defined) && isCount(x.executions)) &&
    Array.isArray(c.browsers) && c.browsers.length === c.projects &&
    c.browsers.every((x) => typeof x?.project === "string" && typeof x?.target === "string" && isCount(x.executions)) &&
    c.browsers.reduce((sum, x) => sum + x.executions, 0) === c.executions;
}

// A commit's file never changes, so results are kept per commit — including "no file" (runs from before
// the file existed), so the Lab's polling doesn't refetch it. Network errors aren't cached: retried next poll.
const byCommit = new Map<string, QaLabCoverage | null>();

export async function loadSuiteCoverage(commitSha: string, fetchImpl: typeof fetch = fetch): Promise<QaLabCoverage | null> {
  if (!/^[0-9a-f]{7,40}$/i.test(commitSha || "")) return null;
  if (byCommit.has(commitSha)) return byCommit.get(commitSha)!;
  try {
    const response = await fetchImpl(coverageFileUrl(commitSha));
    if (response.status === 404) {
      byCommit.set(commitSha, null);
      return null;
    }
    if (!response.ok) return null;
    const coverage: unknown = await response.json();
    const valid = isQaLabCoverage(coverage) ? coverage : null;
    byCommit.set(commitSha, valid);
    return valid;
  } catch {
    return null;
  }
}
