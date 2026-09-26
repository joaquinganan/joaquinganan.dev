import assert from "node:assert/strict";
import test from "node:test";

// Fresh module per test: its per-commit cache must not leak between tests.
const load = () => import(`../lib/qa-lab-coverage.ts?t=${Math.random()}`);

const FILE = {
  definedTests: 34, executions: 96, projects: 5,
  categories: [{ name: "Smoke", defined: 6, executions: 18 }, { name: "Regression", defined: 22, executions: 66 }, { name: "Responsive", defined: 6, executions: 12 }],
  browsers: [{ project: "chromium-desktop", target: "Desktop Chrome", executions: 28 }, { project: "firefox-desktop", target: "Desktop Firefox", executions: 28 },
    { project: "webkit-desktop", target: "Desktop Safari", executions: 28 }, { project: "mobile-chrome", target: "Pixel 7", executions: 6 },
    { project: "mobile-safari", target: "iPhone 15", executions: 6 }],
};

test("reads qa-lab-coverage.json from the E2E repo at the run's commit", async () => {
  const { loadSuiteCoverage } = await load();
  const urls = [];
  const coverage = await loadSuiteCoverage("abc123def4567890", async (url) => { urls.push(url); return Response.json(FILE); });
  assert.deepEqual(coverage, FILE);
  assert.deepEqual(urls, ["https://raw.githubusercontent.com/joaquinganan/portfolio-e2e-automation/abc123def4567890/qa-lab-coverage.json"]);
});

test("caches per commit — including runs from before the file existed — but retries network errors", async () => {
  const { loadSuiteCoverage } = await load();
  let calls = 0;
  const notFound = async () => { calls++; return new Response("", { status: 404 }); };
  assert.equal(await loadSuiteCoverage("aaaaaaa", notFound), null);
  assert.equal(await loadSuiteCoverage("aaaaaaa", notFound), null);
  assert.equal(calls, 1, "the Lab polls every few seconds: a missing file is fetched once");
  let tries = 0;
  const flaky = async () => { if (tries++ === 0) throw new Error("offline"); return Response.json(FILE); };
  assert.equal(await loadSuiteCoverage("bbbbbbb", flaky), null);
  assert.deepEqual(await loadSuiteCoverage("bbbbbbb", flaky), FILE, "a network error is not cached");
});

test("never trusts a malformed file or an invalid commit", async () => {
  const { loadSuiteCoverage, isQaLabCoverage } = await load();
  assert.equal(isQaLabCoverage({ ...FILE, executions: 999 }), false, "browsers must add up to the total");
  assert.equal(isQaLabCoverage({ ...FILE, projects: 4 }), false);
  assert.equal(isQaLabCoverage({ ...FILE, definedTests: -1 }), false);
  assert.equal(await loadSuiteCoverage("ccccccc", async () => Response.json({ hello: 1 })), null);
  let called = false;
  assert.equal(await loadSuiteCoverage("../../etc", async () => { called = true; return Response.json(FILE); }), null);
  assert.equal(called, false, "only a hex commit id is ever put in the URL");
});
