# Nadeesha Shalom — Software Engineering Portfolio

[![Portfolio](https://img.shields.io/badge/Live_Portfolio-Visit-36dca5?style=for-the-badge)](https://nadeesha-d-shalom.github.io/Nadeesha_UI.github.io/)
[![Version](https://img.shields.io/badge/version-5.0.0-6f67ff?style=for-the-badge)](https://github.com/Nadeesha-D-Shalom/Nadeesha_UI.github.io/releases/tag/v5.0.0)
[![Deploy portfolio](https://github.com/Nadeesha-D-Shalom/Nadeesha_UI.github.io/actions/workflows/deploy.yml/badge.svg)](https://github.com/Nadeesha-D-Shalom/Nadeesha_UI.github.io/actions/workflows/deploy.yml)

A premium, responsive portfolio presenting the software engineering work, technical expertise, education, certifications, leadership, and professional profile of **Nadeesha Shalom**.

## Live website

**[nadeesha-d-shalom.github.io/Nadeesha_UI.github.io](https://nadeesha-d-shalom.github.io/Nadeesha_UI.github.io/)**

## Highlights

- Apple-inspired glass navigation and responsive mobile menu
- AI loading sequence and animated Hello introduction
- Full-viewport dual-image hero experience
- Structured About, Education, Projects, Certifications, and Experience sections
- Searchable and filterable project archive
- Sequential, accessible scroll-reveal animations
- Lightweight neural-network background treatment
- Frontend-only contact area with professional social links
- Automatic copyright year
- Search-engine metadata, Open Graph information, sitemap, and structured data
- Reduced-motion support and keyboard-accessible interactions
- Automated GitHub Pages deployments and GitHub Releases

## Technology

- React
- Vite
- JavaScript
- CSS
- Lottie Web
- GitHub Actions
- GitHub Pages

No backend, database, or external API is required.

## Project structure

```text
.
├── .github/
│   └── workflows/
│       ├── deploy.yml
│       └── release.yml
├── assets/
│   ├── img/
│   └── vid/
├── public/
├── src/
│   ├── components/
│   ├── hooks/
│   ├── styles/
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── package.json
└── vite.config.js
```

## Local development

Requirements:

- Node.js 20 or newer
- npm

Install and run:

```bash
git clone https://github.com/Nadeesha-D-Shalom/Nadeesha_UI.github.io.git
cd Nadeesha_UI.github.io
npm install
npm run dev
```

Open `http://localhost:5173/`.

## Production build

```bash
npm run build
npm run preview
```

Vite writes the optimized production files to `dist/`. The directory is generated automatically and must not be committed.

## Automatic deployment

Every push to `main` triggers [deploy.yml](.github/workflows/deploy.yml), which:

1. Checks out the repository.
2. Installs locked dependencies with `npm ci`.
3. Creates the production build.
4. Uploads the `dist` artifact.
5. Deploys it to GitHub Pages.

You do not need to build or upload `dist/` manually.

## Versioning and releases

This project follows [Semantic Versioning](https://semver.org/):

- `MAJOR` — large redesigns or breaking changes, for example `5.0.0`.
- `MINOR` — backward-compatible features, for example `5.1.0`.
- `PATCH` — bug fixes, for example `5.0.1`, `5.0.2`, and `5.0.3`.

Pushing a version tag automatically triggers [release.yml](.github/workflows/release.yml) and creates a GitHub Release with generated release notes.

Example bug-fix release:

```bash
npm version patch
git push origin main
git push origin v5.0.1
```

Example feature release:

```bash
npm version minor
git push origin main
git push origin v5.1.0
```

## Contact

- [LinkedIn](https://www.linkedin.com/in/nadeesha-shalom-a5a2a4251)
- [GitHub](https://github.com/Nadeesha-D-Shalom)
- [Email](mailto:nadeeshashalom1@gmail.com)
- [Portfolio](https://nadeesha-d-shalom.github.io/Nadeesha_UI.github.io/)

---

© Nadeesha Shalom. All rights reserved.
