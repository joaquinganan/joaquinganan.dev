# Joaquín Gañán - QA Portfolio

Personal portfolio for Joaquín Gañán, Senior QA Engineer. The site presents
enterprise QA leadership, manual and exploratory testing, API/backend
validation, Playwright automation, selected work, and contact information in
English and Spanish.

## Highlights

- Complete English/Spanish experience
- Responsive, accessible one-page layout
- Downloadable résumé and direct contact links
- Real QA impact metrics and work history
- Live QA Automation Lab backed by GitHub Actions
- Secure, rate-limited server-side suite dispatch
- Live run status, test distribution, browser matrix, and CI artifacts
- Paired portfolio and Playwright repositories presented as one case study
- Automated GitHub Pages deployment

## Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- Shadcn UI primitives
- Lucide icons

## QA Automation Lab

The portfolio and its automation framework form one public engineering case
study:

- [`joaquinganan.dev`](https://github.com/joaquinganan/joaquinganan.dev) contains
  the portfolio UI and the server-side QA Lab endpoint.
- [`portfolio-e2e-automation`](https://github.com/joaquinganan/portfolio-e2e-automation)
  contains the Playwright test suite and GitHub Actions workflow.

The lab exposes run metadata and diagnostics, but never sends the GitHub token
to the browser. Production dispatch is protected server-side and rate-limited.
Runtime credentials are configured as deployment secrets and are not committed
to this repository.

## Run locally

```bash
npm ci
npm run dev
```

## Build

The standard production build is:

```bash
npm run build
```

GitHub Actions uses Next.js static export and publishes the generated `out/`
directory to GitHub Pages.

## Deployment

Pushes to `main` run the Pages workflow in
`.github/workflows/deploy-pages.yml`. The repository includes the custom
domain declaration for [joaquinganan.dev](https://joaquinganan.dev).

## Security

- Do not commit `.env` files, tokens, or credentials.
- Configure `GITHUB_ACTIONS_TOKEN` only in the deployment environment.
- The public API restricts the permitted workflow, repository, branch, and
  dispatch intent.
- A cooldown limits repeated production-suite requests.

## Author

[Joaquín Gañán](https://github.com/joaquinganan) ·
[LinkedIn](https://www.linkedin.com/in/joaquinganan95)
