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
- Featured Playwright automation project
- Automated GitHub Pages deployment

## Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- Shadcn UI primitives
- Lucide icons

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

## Author

[Joaquín Gañán](https://github.com/joaquinganan) ·
[LinkedIn](https://www.linkedin.com/in/joaquinganan95)
