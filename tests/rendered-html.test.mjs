import assert from "node:assert/strict";
import test from "node:test";

test("renders the public portfolio and E2E navigation contract", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  const response = await worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );

  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Joaquín Gañán \| Senior QA Engineer<\/title>/);
  assert.match(html, /<meta property="og:image" content="https:\/\/joaquinganan\.dev\/og-portfolio\.png"/);
  assert.match(html, /href="https:\/\/joaquinganan\.dev\/favicon-light\.svg" media="\(prefers-color-scheme: light\)"/);
  assert.match(html, /href="https:\/\/joaquinganan\.dev\/favicon-dark\.svg" media="\(prefers-color-scheme: dark\)"/);
  assert.match(html, /aria-label="Joaquín Gañán - home"/);
  assert.match(html, /href="#expertise">Expertise<\/a>/);
  assert.match(html, /href="#experience">Experience<\/a>/);
  assert.match(html, /href="#work">Work<\/a>/);
  assert.match(html, /href="#contact">Contact<\/a>/);
  assert.match(html, /id="qa-lab"/);
  assert.match(html, /QA Automation Lab/);
  assert.match(html, /href="#work">View selected work/);
  assert.doesNotMatch(html, /href="#work">View selected work<svg/);
  assert.match(html, /Newtech SRL · Verizon contractor · 2019 - 2024/);
  assert.match(html, /<strong>6\+<\/strong><span>QAs mentored<\/span>/);
  assert.match(html, /multinational delivery teams/);
  assert.match(html, /UI \+ backend validation/);
  assert.match(html, /<strong>Provisioning flow<\/strong><span>SME<\/span>/);
  assert.doesNotMatch(html, /class="section-label section-marker"/);
  assert.match(html, /aria-expanded="false"/);
  assert.match(html, /aria-controls="expertise-detail-0"/);
  assert.match(html, /View M4PP project/);
  assert.match(html, /Case study in progress/);
  assert.match(html, /Self-testing QA Portfolio/);
  assert.doesNotMatch(html, /Open live QA Lab/);
  assert.match(html, /github\.com\/joaquinganan\/joaquinganan\.dev/);
  assert.match(html, /github\.com\/joaquinganan\/portfolio-e2e-automation/);
  assert.ok(html.indexOf("Self-testing QA Portfolio") < html.indexOf("M4PP Playwright Automation Suite"));
  assert.ok(html.indexOf("M4PP Playwright Automation Suite") < html.indexOf("Integrated Release Assurance"));
  assert.match(html, /aria-label="Switch to dark mode"/);
  assert.match(html, /class="back-to-top /);
  assert.match(html, /<div class="project-heading"><span class="project-number" aria-hidden="true">0/);
  assert.match(html, /<p class="project-type">Public automation project<\/p>/);
});
