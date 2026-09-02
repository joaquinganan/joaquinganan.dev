/** Cloudflare Worker entry point for the vinext-starter template. */
import { handleImageOptimization, DEFAULT_DEVICE_SIZES, DEFAULT_IMAGE_SIZES } from "vinext/server/image-optimization";
import handler from "vinext/server/app-router-entry";

interface Env {
  ASSETS: Fetcher;
  DB: D1Database;
  GITHUB_ACTIONS_TOKEN: string;
  IMAGES: {
    input(stream: ReadableStream): {
      transform(options: Record<string, unknown>): {
        output(options: { format: string; quality: number }): Promise<{ response(): Response }>;
      };
    };
  };
}

const GITHUB_OWNER = "joaquinganan";
const GITHUB_REPO = "portfolio-e2e-automation";
const GITHUB_WORKFLOW = "playwright.yml";
const QA_LAB_ORIGINS = new Set([
  "https://joaquinganan.dev",
  "https://www.joaquinganan.dev",
  "https://joaquinganan-dev.joaquinganan.chatgpt.site",
]);
const DISPATCH_COOLDOWN_MS = 10 * 60 * 1000;

type GithubRun = {
  id: number;
  name: string;
  display_title: string;
  event: string;
  status: string;
  conclusion: string | null;
  html_url: string;
  head_branch: string;
  head_sha: string;
  run_number: number;
  created_at: string;
  run_started_at: string | null;
  updated_at: string;
  actor?: { login?: string };
};

function corsHeaders(request: Request) {
  const origin = request.headers.get("Origin") ?? "";
  return {
    "Access-Control-Allow-Origin": QA_LAB_ORIGINS.has(origin) ? origin : "https://joaquinganan.dev",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    Vary: "Origin",
  };
}

function json(request: Request, body: unknown, init: ResponseInit = {}) {
  return Response.json(body, {
    ...init,
    headers: { ...corsHeaders(request), "Cache-Control": "no-store", ...init.headers },
  });
}

async function github(env: Env, path: string, init: RequestInit = {}) {
  const response = await fetch(`https://api.github.com${path}`, {
    ...init,
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${env.GITHUB_ACTIONS_TOKEN}`,
      "User-Agent": "joaquinganan-qa-lab",
      "X-GitHub-Api-Version": "2022-11-28",
      ...init.headers,
    },
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(`GitHub API ${response.status}: ${message.slice(0, 240)}`);
  }

  return response;
}

function normalizeRun(run: GithubRun) {
  const started = run.run_started_at ? Date.parse(run.run_started_at) : Date.parse(run.created_at);
  const finished = run.status === "completed" ? Date.parse(run.updated_at) : Date.now();
  return {
    id: run.id,
    number: run.run_number,
    title: run.display_title,
    event: run.event,
    status: run.status,
    conclusion: run.conclusion,
    url: run.html_url,
    branch: run.head_branch,
    commit: run.head_sha.slice(0, 7),
    commitSha: run.head_sha,
    actor: run.actor?.login ?? "GitHub Actions",
    createdAt: run.created_at,
    startedAt: run.run_started_at,
    updatedAt: run.updated_at,
    durationSeconds: Math.max(0, Math.round((finished - started) / 1000)),
  };
}

async function getQaLabStatus(request: Request, env: Env) {
  const requestId = new URL(request.url).searchParams.get("request_id");
  const runsResponse = await github(
    env,
    `/repos/${GITHUB_OWNER}/${GITHUB_REPO}/actions/workflows/${GITHUB_WORKFLOW}/runs?per_page=10`,
  );
  const runsPayload = (await runsResponse.json()) as { workflow_runs: GithubRun[] };
  const requestedRun = requestId
    ? runsPayload.workflow_runs.find((run) => run.display_title.includes(requestId))
    : undefined;
  const selectedRun = requestedRun ?? runsPayload.workflow_runs[0];

  if (!selectedRun) return json(request, { error: "No workflow runs are available." }, { status: 404 });

  const [jobsResponse, artifactsResponse] = await Promise.all([
    github(env, `/repos/${GITHUB_OWNER}/${GITHUB_REPO}/actions/runs/${selectedRun.id}/jobs?per_page=20`),
    github(env, `/repos/${GITHUB_OWNER}/${GITHUB_REPO}/actions/runs/${selectedRun.id}/artifacts?per_page=20`),
  ]);
  const jobsPayload = (await jobsResponse.json()) as {
    jobs: Array<{
      id: number;
      name: string;
      status: string;
      conclusion: string | null;
      started_at: string | null;
      completed_at: string | null;
      html_url: string;
      steps?: Array<{ name: string; status: string; conclusion: string | null; number: number }>;
    }>;
  };
  const artifactsPayload = (await artifactsResponse.json()) as {
    artifacts: Array<{ id: number; name: string; size_in_bytes: number; expired: boolean; expires_at: string }>;
  };
  const reportArtifact = artifactsPayload.artifacts.find(
    (artifact) => artifact.name === "playwright-report" && !artifact.expired,
  );

  return json(request, {
    run: normalizeRun(selectedRun),
    requestedRunFound: requestId ? Boolean(requestedRun) : true,
    coverage: {
      definedTests: 16,
      executions: 44,
      projects: 5,
      categories: [
        { name: "Smoke", defined: 3, executions: 9 },
        { name: "Regression", defined: 9, executions: 27 },
        { name: "Responsive", defined: 4, executions: 8 },
      ],
      browsers: [
        { project: "chromium-desktop", target: "Desktop Chrome", executions: 12 },
        { project: "firefox-desktop", target: "Desktop Firefox", executions: 12 },
        { project: "webkit-desktop", target: "Desktop Safari", executions: 12 },
        { project: "mobile-chrome", target: "Pixel 7", executions: 4 },
        { project: "mobile-safari", target: "iPhone 15", executions: 4 },
      ],
    },
    environment: { name: "Production", baseUrl: "https://joaquinganan.dev", runner: "ubuntu-latest" },
    jobs: jobsPayload.jobs,
    artifacts: artifactsPayload.artifacts.map((artifact) => ({
      ...artifact,
      downloadUrl: `${selectedRun.html_url}/artifacts/${artifact.id}`,
    })),
    links: {
      report: reportArtifact
        ? `${selectedRun.html_url}/artifacts/${reportArtifact.id}`
        : selectedRun.html_url,
      repository: `https://github.com/${GITHUB_OWNER}/${GITHUB_REPO}`,
      actions: `https://github.com/${GITHUB_OWNER}/${GITHUB_REPO}/actions/workflows/${GITHUB_WORKFLOW}`,
    },
  });
}

async function dispatchQaLab(request: Request, env: Env) {
  const origin = request.headers.get("Origin") ?? "";
  if (!QA_LAB_ORIGINS.has(origin)) return json(request, { error: "Origin not allowed." }, { status: 403 });
  if (!request.headers.get("Content-Type")?.includes("application/json")) {
    return json(request, { error: "JSON body required." }, { status: 415 });
  }

  const body = (await request.json().catch(() => null)) as { intent?: string; website?: string } | null;
  if (!body || body.intent !== "run-production-regression" || body.website) {
    return json(request, { error: "Invalid request." }, { status: 400 });
  }

  const latestResponse = await github(
    env,
    `/repos/${GITHUB_OWNER}/${GITHUB_REPO}/actions/workflows/${GITHUB_WORKFLOW}/runs?per_page=1`,
  );
  const latestPayload = (await latestResponse.json()) as { workflow_runs: GithubRun[] };
  const activeRun = latestPayload.workflow_runs.find((run) => run.status !== "completed");
  if (activeRun) {
    return json(request, { error: "A QA Lab run is already active.", run: normalizeRun(activeRun) }, { status: 409 });
  }

  const requestId = crypto.randomUUID();
  const now = Date.now();
  const reserved = await env.DB.prepare(
    `INSERT INTO qa_lab_dispatch_locks (key, request_id, dispatched_at)
     VALUES ('production', ?1, ?2)
     ON CONFLICT(key) DO UPDATE SET request_id = ?1, dispatched_at = ?2
     WHERE qa_lab_dispatch_locks.dispatched_at <= ?3
     RETURNING request_id`,
  ).bind(requestId, now, now - DISPATCH_COOLDOWN_MS).first<{ request_id: string }>();

  if (!reserved) {
    const lock = await env.DB.prepare(
      "SELECT dispatched_at FROM qa_lab_dispatch_locks WHERE key = 'production'",
    ).first<{ dispatched_at: number }>();
    const retryAfterSeconds = Math.max(1, Math.ceil(((lock?.dispatched_at ?? now) + DISPATCH_COOLDOWN_MS - now) / 1000));
    return json(request, { error: "The QA Lab is cooling down.", retryAfterSeconds }, { status: 429 });
  }

  try {
    await github(env, `/repos/${GITHUB_OWNER}/${GITHUB_REPO}/actions/workflows/${GITHUB_WORKFLOW}/dispatches`, {
      method: "POST",
      body: JSON.stringify({ ref: "main", inputs: { request_id: requestId } }),
    });
  } catch (error) {
    await env.DB.prepare(
      "DELETE FROM qa_lab_dispatch_locks WHERE key = 'production' AND request_id = ?1",
    ).bind(requestId).run();
    throw error;
  }

  return json(request, { requestId, status: "queued" }, { status: 202 });
}

async function handleQaLab(request: Request, env: Env) {
  if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: corsHeaders(request) });
  if (!env.GITHUB_ACTIONS_TOKEN) return json(request, { error: "QA Lab integration is not configured." }, { status: 503 });

  try {
    if (request.method === "GET") return await getQaLabStatus(request, env);
    if (request.method === "POST") return await dispatchQaLab(request, env);
    return json(request, { error: "Method not allowed." }, { status: 405 });
  } catch (error) {
    console.error("QA Lab error", error);
    return json(request, { error: "The QA Lab could not reach GitHub Actions." }, { status: 502 });
  }
}

interface ExecutionContext {
  waitUntil(promise: Promise<unknown>): void;
  passThroughOnException(): void;
}

// Image security config. SVG sources with .svg extension auto-skip the
// optimization endpoint on the client side (served directly, no proxy).
// To route SVGs through the optimizer (with security headers), set
// dangerouslyAllowSVG: true in next.config.js and uncomment below:
// const imageConfig: ImageConfig = { dangerouslyAllowSVG: true };

const worker = {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/_vinext/image") {
      const allowedWidths = [...DEFAULT_DEVICE_SIZES, ...DEFAULT_IMAGE_SIZES];
      return handleImageOptimization(request, {
        fetchAsset: (path) => env.ASSETS.fetch(new Request(new URL(path, request.url))),
        transformImage: async (body, { width, format, quality }) => {
          const result = await env.IMAGES.input(body).transform(width > 0 ? { width } : {}).output({ format, quality });
          return result.response();
        },
      }, allowedWidths);
    }

    if (url.pathname === "/api/qa-lab") {
      return handleQaLab(request, env);
    }

    return handler.fetch(request, env, ctx);
  },
};

export default worker;
