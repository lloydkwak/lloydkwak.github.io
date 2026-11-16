# lloydkwak.github.io

Personal academic website of DongGeon (Lloyd) Kwak. Intended GitHub Pages URL: https://lloydkwak.github.io.
The research-first layout is inspired by [Jon Barron's website](https://jonbarron.info/). See [the reference review](docs/portfolio-research.md) for the five developer/researcher sites studied and the resulting decisions.

```
index.html        the page
stylesheet.css    styles
script.js         accessible video previews
images/           thumbnails (160 px boxes, stored at 320 px) and hover videos
data/             CV, Research Portfolio and Career Description (PDF)
data/src/         LaTeX sources and figures for the three PDFs
scripts/          dependency-free validation and Pages packaging
.github/workflows/pages.yml   automatic GitHub Pages deployment
```

## Edit the page
Edit `index.html`. Each project is one `<article class="paper">`; add `class="paper highlighted"` to highlight it,
and `data-video` plus a `<video>` inside `.two` for a clip with hover and keyboard/touch playback. Reduced motion disables hover autoplay. Preview locally with `python -m http.server`.

## Check and publish

```bash
node --check script.js
node scripts/validate.mjs
node scripts/build.mjs
```

The workflow deploys `_site/`, containing the page, assets and the three PDFs. LaTeX sources and repository documentation stay out of the deployment artifact.

Publish this repository as `lloydkwak/lloydkwak.github.io` and select **Settings → Pages → Source → GitHub Actions**. Pushes to `main` validate and redeploy automatically.

The parent workspace also contains `github-profile/README.md`, the full replacement for the profile README in `lloydkwak/lloydkwak`, and `publish-github.py`, which publishes the site, verifies deployment, replaces the profile README and sets the profile website field. Run `python publish-github.py` from the parent folder with a working, authenticated GitHub CLI connection.

## Rebuild the PDFs
```bash
cd data/src
pdflatex cv.tex        && cp cv.pdf ../DongGeon_Kwak_CV.pdf
pdflatex career.tex    && pdflatex career.tex    && cp career.pdf ../DongGeon_Kwak_Career_Description.pdf
pdflatex portfolio.tex && pdflatex portfolio.tex && cp portfolio.pdf ../DongGeon_Kwak_Research_Portfolio.pdf
```
Needs a TeX Live install with `charter`, `helvet`, `tcolorbox`, `tikz` (all in a standard TeX Live) or Overleaf.
