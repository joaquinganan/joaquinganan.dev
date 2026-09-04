import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test, { after } from "node:test";
import { fileURLToPath } from "node:url";

import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { createServer } from "vite";

const root = fileURLToPath(new URL("..", import.meta.url));
const vite = await createServer({
  appType: "custom",
  configFile: false,
  root,
  resolve: { alias: { "@": root } },
  server: { middlewareMode: true },
});

after(async () => {
  await vite.close();
});

test("defines the portfolio palette and responsive accessibility rules", async () => {
  const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
  const lab = await readFile(new URL("../components/qa-automation-lab.tsx", import.meta.url), "utf8");

  assert.match(css, /--background:\s*#f7f8f6/i);
  assert.match(css, /--accent:\s*#2f5232/i);
  assert.match(css, /--accent-bright:\s*#8aca74/i);
  assert.match(css, /@media \(max-width:\s*560px\)/);
  assert.match(css, /@media \(prefers-reduced-motion:\s*reduce\)/);
  assert.match(css, /@keyframes metric-scroll/);
  assert.match(css, /\.metric-marquee:hover \.metric-track/);
  assert.match(css, /\.metric-set\[aria-hidden="true"\]/);
  assert.match(css, /outline:\s*2px solid var\(--accent\)/);
  assert.match(css, /position:\s*sticky/);
  assert.match(css, /aspect-ratio:\s*4\s*\/\s*5/);
  assert.match(css, /border-radius:\s*999px/);
  assert.match(css, /box-shadow:\s*0 0 0 100vmax var\(--surface\)/);
  assert.match(css, /\.lab-section\s*\{[\s\S]*?background:\s*#000;[\s\S]*?box-shadow:\s*none;/);
  assert.match(css, /\.toolbox-section\s*\{[\s\S]*?box-shadow:\s*0 0 0 100vmax var\(--background\)/);
  assert.match(css, /\.qa-evidence-secondary\s*\{[\s\S]*?display:\s*flex;[\s\S]*?justify-content:\s*flex-end;/);
  assert.match(css, /\.footer-trademark\s*\{[\s\S]*?grid-column:\s*1 \/ -1;[\s\S]*?max-width:\s*none;/);
  assert.match(css, /\.content-section\[id\]\s*\{\s*scroll-margin-top:\s*-1\.25rem;/);
  assert.match(css, /\.contact-secondary-links\s*\{[\s\S]*?display:\s*flex;/);
  assert.match(css, /html\.dark\s*\{[\s\S]*?--background:\s*#111511/);
  assert.match(css, /\.back-to-top\s*\{[\s\S]*?position:\s*fixed/);
  assert.match(css, /\.back-to-top\.is-visible\s*\{[\s\S]*?pointer-events:\s*auto/);
  assert.match(css, /\.site-header\s*{[^}]*width:\s*100%/s);
  assert.doesNotMatch(css, /\.section-marker\s*{/);
  assert.match(css, /@media \(prefers-reduced-motion:\s*no-preference\)/);
  assert.match(css, /\.site-nav a\.is-active/);
  assert.doesNotMatch(css, /\.site-nav\s*{[^}]*display:\s*none/s);
  assert.match(css, /\.expertise-item\s*{[\s\S]*?padding:\s*2\.25rem clamp\(1\.75rem, 2\.5vw, 2\.25rem\)/);
  assert.doesNotMatch(css, /\.expertise-item:first-child\s*{\s*padding-left:\s*0/);
  assert.match(lab, /setAwaitingRequestedRun\(true\)/);
  assert.match(lab, /const progressSteps = awaitingRequestedRun \? \[\]/);
  assert.match(lab, /awaitingRequestedRun \? t\.starting : t\.waiting/);
  assert.match(lab, /className="qa-lab-live" aria-busy=\{loading\}/);
  assert.match(css, /\.qa-lab-live\s*\{[^}]*min-block-size: 43rem;/s);
});

test("forwards progress semantics to the primitive", async () => {
  const { Progress } = await vite.ssrLoadModule("/components/ui/progress.tsx");
  const html = renderToStaticMarkup(React.createElement(Progress, { value: 37 }));

  assert.match(html, /aria-valuenow="37"/);
  assert.match(html, /aria-valuetext="37%"/);
  assert.match(html, /data-state="loading"/);
});

test("emits chart themes for the starter's media dark mode", async () => {
  const { ChartStyle } = await vite.ssrLoadModule("/components/ui/chart.tsx");
  const html = renderToStaticMarkup(
    React.createElement(ChartStyle, {
      id: "contract",
      config: {
        latency: { theme: { light: "#ffffff", dark: "#000000" } },
      },
    }),
  );

  assert.match(html, /\[data-chart=contract\]/);
  assert.match(html, /@media \(prefers-color-scheme: dark\)/);
  assert.doesNotMatch(html, /\.dark/);
});

test("renders sidebar skeletons deterministically", async () => {
  const { SidebarMenuSkeleton } = await vite.ssrLoadModule(
    "/components/ui/sidebar.tsx",
  );
  const first = renderToStaticMarkup(React.createElement(SidebarMenuSkeleton));
  const second = renderToStaticMarkup(React.createElement(SidebarMenuSkeleton));

  assert.equal(first, second);
  assert.match(first, /--skeleton-width:70%/);
});
