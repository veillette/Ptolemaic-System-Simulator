# Ptolemaic System Simulator

A browser re-implementation of the NAAP
[Ptolemaic System Simulator](https://astro.unl.edu/naap/ssm/animations/ptolemaic.html),
built with React and [PixiJS](https://pixijs.com/). It models the apparent
motion of the planets in a simplified Ptolemaic (geocentric) solar system,
including the deferent, epicycle, equant, and the resulting position along the
zodiac.

## Requirements

- Node.js 18 or newer
- npm

## Getting started

```bash
npm install      # install dependencies
npm run serve    # start the dev server (with hot reload) and open the app
```

## Available scripts

| Script           | Description                                             |
| ---------------- | ------------------------------------------------------- |
| `npm run serve`  | Start the webpack dev server with hot reloading.        |
| `npm run build`  | Produce a production build in `dist/`.                  |
| `npm test`       | Run the Jest unit tests.                                |
| `npm run eslint` | Lint the source files.                                  |
| `npm run fix`    | Lint and auto-fix where possible.                       |

To preview a production build locally, run `npm run build` and open
`index.html` (the page loads the bundles from `dist/`).

## Project structure

```
src/
  main.jsx                     React entry point
  PtolemaicSystemSimulator.jsx Top-level component / application state
  OrbitView.jsx                PixiJS canvas with the orbit animation
  ZodiacStrip.jsx              PixiJS strip showing planet/sun longitude
  PlanetaryParameters.jsx      Planet presets and parameter controls
  ControlsAndSettings.jsx      Animation and overlay toggles
  Timer.jsx                    Elapsed simulation time display
  pathTracer.js                Smoothed trail behind the planet
  util/                        Pure, render-free helpers (unit tested)
```

## Deployment

The site is published to GitHub Pages by the
[`Deploy to GitHub Pages`](.github/workflows/deploy.yml) workflow on every push
to `master`. The build output is no longer committed to the repository; the
workflow builds it and uploads it as the Pages artifact.

> To enable this, set the repository's Pages source to **GitHub Actions**
> (Settings → Pages → Build and deployment → Source).

## Acknowledgements

This simulator is part of the Foothill AstroSims project and is based on the
original simulation from the
[Nebraska Astronomy Applet Project](https://astro.unl.edu).
