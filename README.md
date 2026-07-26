# Nadeesha Shalom — Software Engineering Portfolio

An interactive software-engineering portfolio for Nadeesha Shalom, built with React, Vite, and CSS.

## Local development

```bash
npm install
npm run dev
```

Create a production build with:

```bash
npm run build
```

## GitHub Pages

Every push to `main` is automatically built and deployed by GitHub Actions.

For the first deployment only, open the repository on GitHub and select:

`Settings → Pages → Build and deployment → Source → GitHub Actions`

The workflow in `.github/workflows/deploy.yml` installs locked dependencies, builds the Vite application, uploads `dist`, and deploys it. Do not commit the `dist` directory.
