import assert from "node:assert/strict";
import test from "node:test";

async function loadWorker() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${Math.random()}`);
  return (await import(workerUrl.href)).default;
}

test("returns normalized live QA Lab evidence without exposing its credential", async () => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async (input) => {
    const url = String(input);
    if (url.includes("/jobs")) {
      return Response.json({ jobs: [{ id: 2, name: "test", status: "completed", conclusion: "success", steps: [] }] });
    }
    if (url.includes("/artifacts")) {
      return Response.json({ artifacts: [{ id: 3, name: "playwright-report", size_in_bytes: 1024, expired: false, expires_at: "2026-09-16T00:00:00Z" }] });
    }
    return Response.json({
      workflow_runs: [{
        id: 1,
        name: "Playwright Tests",
        display_title: "QA Lab - workflow_dispatch",
        event: "workflow_dispatch",
        status: "completed",
        conclusion: "success",
        html_url: "https://github.com/joaquinganan/portfolio-e2e-automation/actions/runs/1",
        head_branch: "main",
        head_sha: "1234567890abcdef",
        run_number: 42,
        created_at: "2026-09-02T00:00:00Z",
        run_started_at: "2026-09-02T00:00:05Z",
        updated_at: "2026-09-02T00:01:05Z",
        actor: { login: "joaquinganan" },
      }],
    });
  };

  try {
    const worker = await loadWorker();
    const response = await worker.fetch(
      new Request("https://portfolio.test/api/qa-lab", { headers: { Origin: "https://joaquinganan.dev" } }),
      { GITHUB_ACTIONS_TOKEN: "never-return-this-token" },
      { waitUntil() {}, passThroughOnException() {} },
    );
    const body = await response.json();

    assert.equal(response.status, 200);
    assert.equal(body.run.conclusion, "success");
    assert.equal(body.run.commit, "1234567");
    assert.equal(body.coverage.definedTests, 30);
    assert.equal(body.coverage.executions, 84);
    assert.equal(body.coverage.projects, 5);
    assert.doesNotMatch(JSON.stringify(body), /never-return-this-token/);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("rejects cross-origin QA Lab dispatch requests", async () => {
  const worker = await loadWorker();
  const response = await worker.fetch(
    new Request("https://portfolio.test/api/qa-lab", {
      method: "POST",
      headers: { Origin: "https://example.com", "Content-Type": "application/json" },
      body: JSON.stringify({ intent: "run-production-regression", website: "" }),
    }),
    { GITHUB_ACTIONS_TOKEN: "configured" },
    { waitUntil() {}, passThroughOnException() {} },
  );

  assert.equal(response.status, 403);
});
