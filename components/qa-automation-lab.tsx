"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import {
  ArrowUpRight,
  Check,
  ChevronDown,
  CircleDot,
  Clock3,
  Code2,
  ExternalLink,
  GitCommitHorizontal,
  LoaderCircle,
  Play,
  RefreshCw,
  ShieldCheck,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Language = "en" | "es";
type LabView = "overview" | "browsers" | "coverage" | "progress";

type LabData = {
  run: {
    id: number;
    number: number;
    title: string;
    event: string;
    status: string;
    conclusion: string | null;
    url: string;
    branch: string;
    commit: string;
    commitSha: string;
    actor: string;
    createdAt: string;
    startedAt: string | null;
    updatedAt: string;
    durationSeconds: number;
  };
  requestedRunFound: boolean;
  coverage: {
    definedTests: number;
    executions: number;
    projects: number;
    categories: Array<{ name: string; defined: number; executions: number }>;
    browsers: Array<{ project: string; target: string; executions: number }>;
  };
  environment: { name: string; baseUrl: string; runner: string };
  jobs: Array<{
    id: number;
    name: string;
    status: string;
    conclusion: string | null;
    steps?: Array<{ name: string; status: string; conclusion: string | null; number: number }>;
  }>;
  artifacts: Array<{ id: number; name: string; size_in_bytes: number; expired: boolean; expires_at: string }>;
  links: { report: string; repository: string; actions: string };
};

type LabStep = NonNullable<LabData["jobs"][number]["steps"]>[number];

const API_BASE = "https://joaquinganan-dev.joaquinganan.chatgpt.site";

const labels = {
  en: {
    status: "Live QA Lab",
    title: "This portfolio tests itself.",
    intro: "Run the production Playwright suite and inspect its latest CI evidence.",
    loading: "Loading the latest CI evidence...",
    unavailable: "Live CI data is temporarily unavailable.",
    retry: "Try again",
    latest: "Latest production run",
    run: "Run production suite",
    running: "Suite in progress",
    queued: "Request accepted. Waiting for a GitHub runner...",
    cooldown: "The runner is protected by a short cooldown. Try again shortly.",
    defined: "Tests defined",
    executions: "Cross-browser executions",
    projects: "Browser projects",
    environment: "Environment",
    runner: "Runner",
    branch: "Branch",
    commit: "Commit",
    duration: "Duration",
    triggered: "Triggered by",
    overview: "Overview",
    browsers: "Browsers",
    browserMatrix: "Browser matrix",
    coverage: "Test distribution",
    coverageCategory: "Tests and browser executions",
    categoryTests: "defined tests",
    categoryExecutions: "browser executions",
    progress: "Live progress",
    collapse: "Select again to collapse",
    evidence: "Evidence & diagnostics",
    report: "Download HTML report",
    workflow: "View GitHub run",
    repository: "View framework",
    artifacts: "Artifacts retained for 14 days",
    passed: "Passed",
    failed: "Failed",
    cancelled: "Cancelled",
    active: "Running",
    starting: "Starting the new run...",
    waiting: "Waiting",
    unknown: "Status unavailable",
    secure: "Server-side dispatch · 10-minute cooldown · no credentials exposed",
    scope: "Production · Chromium, Firefox, WebKit, Pixel 7 and iPhone 15",
  },
  es: {
    status: "QA Lab en vivo",
    title: "Este portafolio se prueba a sí mismo.",
    intro: "Ejecuta la suite de Playwright en producción y revisa su evidencia más reciente de CI.",
    loading: "Cargando la evidencia más reciente de CI...",
    unavailable: "Los datos de CI no están disponibles temporalmente.",
    retry: "Intentar nuevamente",
    latest: "Última ejecución en producción",
    run: "Ejecutar suite en producción",
    running: "Suite en progreso",
    queued: "Solicitud aceptada. Esperando un runner de GitHub...",
    cooldown: "El runner tiene un cooldown de protección. Intenta nuevamente en unos minutos.",
    defined: "Pruebas definidas",
    executions: "Ejecuciones cross-browser",
    projects: "Proyectos de navegador",
    environment: "Ambiente",
    runner: "Runner",
    branch: "Rama",
    commit: "Commit",
    duration: "Duración",
    triggered: "Iniciada por",
    overview: "Resumen",
    browsers: "Navegadores",
    browserMatrix: "Matriz de navegadores",
    coverage: "Distribución de pruebas",
    coverageCategory: "Pruebas y ejecuciones por navegador",
    categoryTests: "pruebas definidas",
    categoryExecutions: "ejecuciones por navegador",
    progress: "Progreso en vivo",
    collapse: "Selecciona nuevamente para contraer",
    evidence: "Evidencia y diagnósticos",
    report: "Descargar reporte HTML",
    workflow: "Ver ejecución en GitHub",
    repository: "Ver framework",
    artifacts: "Artefactos conservados durante 14 días",
    passed: "Aprobada",
    failed: "Fallida",
    cancelled: "Cancelada",
    active: "En ejecución",
    starting: "Iniciando la nueva ejecución...",
    waiting: "En espera",
    unknown: "Estado no disponible",
    secure: "Ejecución server-side · cooldown de 10 minutos · credenciales protegidas",
    scope: "Producción · Chromium, Firefox, WebKit, Pixel 7 y iPhone 15",
  },
} as const;

function runState(data: LabData | null, language: Language) {
  const t = labels[language];
  if (!data) return { text: t.unknown, tone: "neutral" };
  if (data.run.status !== "completed") return { text: t.active, tone: "active" };
  if (data.run.conclusion === "success") return { text: t.passed, tone: "passed" };
  if (data.run.conclusion === "cancelled") return { text: t.cancelled, tone: "neutral" };
  return { text: t.failed, tone: "failed" };
}

function formatDuration(seconds: number) {
  if (seconds < 60) return `${seconds}s`;
  const minutes = Math.floor(seconds / 60);
  const remainder = seconds % 60;
  return `${minutes}m ${remainder}s`;
}

function LiveProgressList({ steps, waiting }: { steps: LabStep[]; waiting: string }) {
  const listRef = useRef<HTMLOListElement>(null);
  let targetIndex = steps.findIndex((step) => step.status === "in_progress");

  if (targetIndex < 0) {
    for (let index = steps.length - 1; index >= 0; index -= 1) {
      if (steps[index].conclusion === "success") {
        targetIndex = index;
        break;
      }
    }
  }

  const targetStepNumber = targetIndex >= 0 ? steps[targetIndex].number : null;

  useEffect(() => {
    const list = listRef.current;
    if (!list || targetStepNumber === null) return;

    const frame = window.requestAnimationFrame(() => {
      const target = list.querySelector<HTMLElement>(`[data-step-number="${targetStepNumber}"]`);
      if (!target) return;

      const listRect = list.getBoundingClientRect();
      const targetRect = target.getBoundingClientRect();
      const centeredTop = list.scrollTop
        + targetRect.top
        - listRect.top
        - (list.clientHeight - targetRect.height) / 2;
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      list.scrollTo({
        top: Math.max(0, centeredTop),
        behavior: reducedMotion ? "auto" : "smooth",
      });
    });

    return () => window.cancelAnimationFrame(frame);
  }, [targetStepNumber]);

  return (
    <ol className="qa-progress-list" ref={listRef}>
      {steps.length ? steps.map((step) => (
        <li
          key={`${step.number}-${step.name}`}
          className={`step-${step.conclusion ?? step.status}`}
          data-step-number={step.number}
          aria-current={step.status === "in_progress" ? "step" : undefined}
        >
          {step.conclusion === "success" ? <Check aria-hidden="true" /> : step.status === "in_progress" ? <LoaderCircle className="spin" aria-hidden="true" /> : <span aria-hidden="true" />}
          <span>{step.name}</span>
        </li>
      )) : <li><span aria-hidden="true" /><span>{waiting}</span></li>}
    </ol>
  );
}

export function QaAutomationLab({ language }: { language: Language }) {
  const t = labels[language];
  const [data, setData] = useState<LabData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [requestId, setRequestId] = useState<string | null>(null);
  const [dispatching, setDispatching] = useState(false);
  const [awaitingRequestedRun, setAwaitingRequestedRun] = useState(false);
  const [activeView, setActiveView] = useState<LabView | null>(null);
  const userControlledViewRef = useRef(false);
  const pollRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const loadStatus = useCallback(async (correlationId?: string | null) => {
    const url = new URL("/api/qa-lab", API_BASE);
    if (correlationId) url.searchParams.set("request_id", correlationId);
    const response = await fetch(url, { headers: { Accept: "application/json" } });
    if (!response.ok) throw new Error("status");
    const nextData = (await response.json()) as LabData;
    if (!userControlledViewRef.current) {
      setActiveView(nextData.run.status === "completed" ? "coverage" : "progress");
    }
    setData(nextData);
    setError("");
    setLoading(false);
    return nextData;
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      loadStatus().catch(() => {
        setError(t.unavailable);
        setLoading(false);
      });
    }, 0);

    return () => window.clearTimeout(timer);
  }, [loadStatus, t.unavailable]);

  useEffect(() => () => {
    if (pollRef.current) clearTimeout(pollRef.current);
  }, []);

  useEffect(() => {
    if (!requestId) return;

    let cancelled = false;
    const poll = async () => {
      try {
        const nextData = await loadStatus(requestId);
        if (nextData.requestedRunFound) setAwaitingRequestedRun(false);
        const finished = nextData.requestedRunFound && nextData.run.status === "completed";
        if (finished) {
          setRequestId(null);
          return;
        }
      } catch {
        // Keep polling transient GitHub API failures for the active request.
      }
      if (!cancelled) pollRef.current = setTimeout(poll, 5000);
    };

    pollRef.current = setTimeout(poll, 2500);
    return () => {
      cancelled = true;
      if (pollRef.current) clearTimeout(pollRef.current);
    };
  }, [loadStatus, requestId]);

  const dispatch = async () => {
    setDispatching(true);
    setAwaitingRequestedRun(true);
    userControlledViewRef.current = true;
    setActiveView("progress");
    setError("");
    try {
      const response = await fetch(new URL("/api/qa-lab", API_BASE), {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ intent: "run-production-regression", website: "" }),
      });
      const payload = (await response.json()) as { requestId?: string; error?: string; run?: LabData["run"] };
      if (response.status === 409 && payload.run) {
        setData((current) => current ? { ...current, run: payload.run!, jobs: [] } : current);
        setError(t.running);
        await loadStatus();
        setAwaitingRequestedRun(false);
        return;
      }
      if (response.status === 429) {
        setError(t.cooldown);
        setAwaitingRequestedRun(false);
        return;
      }
      if (!response.ok || !payload.requestId) throw new Error(payload.error ?? "dispatch");
      setRequestId(payload.requestId);
    } catch {
      setError(t.unavailable);
      setAwaitingRequestedRun(false);
    } finally {
      setDispatching(false);
    }
  };

  const state = runState(data, language);
  const isActive = dispatching || Boolean(requestId) || (data ? data.run.status !== "completed" : true);
  const testJob = data?.jobs.find((job) => job.name.toLowerCase().includes("test")) ?? data?.jobs[0];
  const progressSteps = awaitingRequestedRun ? [] : testJob?.steps ?? [];

  const overviewContent = data ? (
    <div className="qa-overview-content">
      <dl className="qa-overview-list">
        <div><dt>{t.environment}</dt><dd><a href={data.environment.baseUrl}>{data.environment.name}</a></dd></div>
        <div><dt>{t.runner}</dt><dd>{data.environment.runner}</dd></div>
        <div><dt>{t.branch}</dt><dd>{data.run.branch}</dd></div>
        <div><dt>{t.triggered}</dt><dd>{data.run.actor}</dd></div>
      </dl>
      <p className="qa-scope"><Code2 aria-hidden="true" />{t.scope}</p>
    </div>
  ) : null;

  const browsersContent = data ? (
    <div className="qa-detail-content">
      <h3>{t.browserMatrix}</h3>
      <div className="browser-matrix">
        {data.coverage.browsers.map((browser) => (
          <div key={browser.project}><span><i aria-hidden="true" />{browser.target}</span><strong>{browser.executions}</strong></div>
        ))}
      </div>
    </div>
  ) : null;

  const coverageContent = data ? (
    <div className="qa-detail-content">
      <h3>{t.coverageCategory}</h3>
      <div className="test-distribution">
        {data.coverage.categories.map((category) => (
          <div key={category.name}>
            <strong>{category.name}</strong>
            <span><b>{category.defined}</b>{t.categoryTests}</span>
            <span><b>{category.executions}</b>{t.categoryExecutions}</span>
          </div>
        ))}
      </div>
    </div>
  ) : null;

  const progressContent = (
    <div className="qa-detail-content">
      <h3>{t.progress}</h3>
      <LiveProgressList steps={progressSteps} waiting={awaitingRequestedRun ? t.starting : t.waiting} />
    </div>
  );

  const views: Array<{ value: LabView; label: string; content: ReactNode }> = [
    { value: "overview", label: t.overview, content: overviewContent },
    { value: "browsers", label: t.browsers, content: browsersContent },
    { value: "coverage", label: t.coverage, content: coverageContent },
    { value: "progress", label: t.progress, content: progressContent },
  ];

  return (
    <div className="qa-lab-live" aria-busy={loading}>
      <header className="qa-lab-header">
        <div className="qa-lab-title-block">
          <div className="lab-heading-row">
            <p className="section-label">QA Automation Lab</p>
            <span className={`run-badge run-badge-${state.tone}`}><CircleDot aria-hidden="true" />{t.status}</span>
          </div>
          <h2 id="lab-title">{t.title}</h2>
          <p>{t.intro}</p>
        </div>
        <div className="qa-lab-run-control">
          <button type="button" className="qa-run-button" onClick={dispatch} disabled={isActive}>
            {isActive ? <LoaderCircle className="spin" aria-hidden="true" /> : <Play aria-hidden="true" />}
            {isActive ? t.running : t.run}
          </button>
          <span><ShieldCheck aria-hidden="true" />{t.secure}</span>
        </div>
      </header>

      {loading ? (
        <div className="qa-lab-message"><LoaderCircle className="spin" aria-hidden="true" />{t.loading}</div>
      ) : error && !data ? (
        <div className="qa-lab-message qa-lab-error">
          <span>{error}</span>
          <button type="button" onClick={() => { setLoading(true); loadStatus().catch(() => setLoading(false)); }}>
            <RefreshCw aria-hidden="true" />{t.retry}
          </button>
        </div>
      ) : data ? (
        <>
          {(requestId || error) && <div className="qa-lab-notice" role="status">{requestId ? t.queued : error}</div>}

          <div className="qa-run-strip">
            <div className="qa-run-identity">
              <span>{t.latest}</span>
              <strong>#{data.run.number}</strong>
              <span className={`run-badge run-badge-${state.tone}`}>
                {state.tone === "passed" ? <Check aria-hidden="true" /> : state.tone === "active" ? <LoaderCircle className="spin" aria-hidden="true" /> : <CircleDot aria-hidden="true" />}
                {state.text}
              </span>
            </div>
            <div className="qa-metric-strip">
              <div><strong>{data.coverage.definedTests}</strong><span>{t.defined}</span></div>
              <div><strong>{data.coverage.executions}</strong><span>{t.executions}</span></div>
              <div><strong>{data.coverage.projects}</strong><span>{t.projects}</span></div>
              <div><strong><Clock3 aria-hidden="true" />{formatDuration(data.run.durationSeconds)}</strong><span>{t.duration}</span></div>
              <div><strong className="qa-commit"><GitCommitHorizontal aria-hidden="true" />{data.run.commit}</strong><span>{t.commit}</span></div>
            </div>
          </div>

          <Tabs
            value={activeView ?? ""}
            onValueChange={(value) => {
              userControlledViewRef.current = true;
              setActiveView(value as LabView);
            }}
            className="qa-desktop-tabs"
            data-collapsed={activeView === null}
          >
            <TabsList variant="line" aria-label="QA Lab views">
              {views.map((view) => (
                <TabsTrigger
                  key={view.value}
                  value={view.value}
                  aria-label={activeView === view.value ? `${view.label}. ${t.collapse}` : view.label}
                  onMouseDown={(event) => {
                    if (activeView === view.value) {
                      event.preventDefault();
                      userControlledViewRef.current = true;
                      setActiveView(null);
                    }
                  }}
                  onKeyDown={(event) => {
                    if (activeView === view.value && (event.key === "Enter" || event.key === " ")) {
                      event.preventDefault();
                      userControlledViewRef.current = true;
                      setActiveView(null);
                    }
                  }}
                >
                  {view.label}
                  <ChevronDown className="qa-tab-chevron" aria-hidden="true" />
                </TabsTrigger>
              ))}
            </TabsList>
            {views.map((view) => <TabsContent key={view.value} value={view.value}>{view.content}</TabsContent>)}
          </Tabs>

          <Accordion
            type="single"
            collapsible
            value={activeView ?? ""}
            onValueChange={(value) => {
              userControlledViewRef.current = true;
              setActiveView(value ? value as LabView : null);
            }}
            className="qa-mobile-accordion"
          >
            {views.map((view) => (
              <AccordionItem key={view.value} value={view.value}>
                <AccordionTrigger>{view.label}</AccordionTrigger>
                <AccordionContent>{view.content}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <footer className="qa-evidence">
            <div><h3>{t.evidence}</h3><p>{t.artifacts}</p></div>
            <div className="qa-evidence-links">
              <a className="primary-link" href={data.links.report} target="_blank" rel="noreferrer">{t.report}<ExternalLink aria-hidden="true" /></a>
              <div className="qa-evidence-secondary">
                <a href={data.run.url} target="_blank" rel="noreferrer">{t.workflow}<ArrowUpRight aria-hidden="true" /></a>
                <a href={data.links.repository} target="_blank" rel="noreferrer">{t.repository}<ArrowUpRight aria-hidden="true" /></a>
              </div>
            </div>
          </footer>
        </>
      ) : null}
    </div>
  );
}
