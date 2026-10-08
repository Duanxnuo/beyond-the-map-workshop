# RESHAPE 2027 workshop website

The website presents RESHAPE 2027, a workshop at FSE 2027. It uses the existing Morandi palette and responsive layout, with JetBrains Mono for dates and interface labels.

The exact workshop day, invited speaker, programme committee, submission portal, contact address, and room will be added when announced.

## Edit the website content

Edit [`content.md`](./content.md) to change the main text, dates, organisers, schedule, and FAQ.

- The first `#` line controls the website title. The next two nonempty lines are the subtitle and event detail below the title.
- `Orbit label 1:` and `Orbit label 2:` change the short labels beside the animated circles.
- Each `##` heading identifies a section. Keep the heading names because the navigation uses them.
- Tables use vertical bars (`|`). Edit or add rows below each header and separator.
- `**text**` makes text bold. A blank line starts a new paragraph.

The header and footer use the title and subtitle from `content.md`. The search description is in [`index.template.html`](./index.template.html). The palette and motion are in [`style.css`](./style.css).

## Preview locally

With Node.js 20 or newer installed:

```bash
npm run build
npm run preview
```

Open the local address shown in the terminal. After editing `content.md`, run `npm run build` again and refresh the page. The build has no third-party dependencies. Web fonts require an internet connection; fallback fonts are provided.

## Publishing

The existing site is published at [duanxnuo.github.io/beyond-the-map-workshop](https://duanxnuo.github.io/beyond-the-map-workshop/). A commit to `main` triggers [`.github/workflows/pages.yml`](./.github/workflows/pages.yml), which builds and deploys the site to GitHub Pages. The repository and URL retain their original name; the displayed website name is RESHAPE 2027.

## Files

- `content.md`: text and structured content; the main file to edit.
- `index.template.html`: page structure and metadata.
- `style.css`: palette, typography, responsive layout, and motion.
- `script.js`: mobile navigation and scrolling behavior.
- `build.mjs`: generates the finished page from Markdown.
- `dist/`: generated files, recreated by the deployment workflow.
