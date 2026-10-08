# Beyond the Map Workshop Website

An **illustrative** academic workshop website using the colors `#504657`, `#7D726E`, `#D5C3DE`, and `#FAEEEE`. Typography uses Manrope for headings, DM Sans for body copy, and JetBrains Mono for dates, labels, and numbering.

The event, people, dates, venue, and submission details are placeholders. This is not an official conference announcement.

## Edit the website content

Edit only [`content.md`](./content.md) for the main text, dates, speakers, organizers, and program.

- `# Beyond the Map` is the website title. The next two nonempty lines are the subtitle and event details.
- `Orbit label 1:` and `Orbit label 2:` change the two short labels beside the animated circles in the opening panel. Edit the text after each colon.
- Each `##` heading identifies a section. Keep these heading names unchanged because the navigation uses them.
- Tables use vertical bars (`|`). Edit or add rows beneath the header and `---` separator.
- `**text**` makes text bold. Blank lines separate paragraphs.

Before using the site as a real announcement, confirm the event affiliation, dates, submission portal, speakers, organizers, venue, and contact details. Verify that listed people have agreed to appear.

## Preview locally

With Node.js 20 or newer installed, run:

```bash
npm run build
npm run preview
```

Open the local address shown in the terminal. After editing `content.md`, run `npm run build` again and refresh the page. The build has no third-party dependencies. Web fonts require an internet connection; fallback fonts are provided.

## GitHub Pages

The site is published at [duanxnuo.github.io/beyond-the-map-workshop](https://duanxnuo.github.io/beyond-the-map-workshop/). A commit to `main` runs the workflow in [`.github/workflows/pages.yml`](./.github/workflows/pages.yml), which builds and deploys the site automatically.

For a new repository, upload these files to its root, including `.github/workflows/pages.yml`. In **Settings → Pages**, set **Source** to **GitHub Actions**. If the default branch is not `main`, update the workflow trigger.

## Files

- `content.md`: text and structured content; the main file to edit.
- `style.css`: palette, typography, responsive layout, and motion.
- `script.js`: mobile navigation and scroll behavior.
- `index.template.html` and `build.mjs`: generate the finished page from Markdown.
- `dist/`: generated site files, recreated by the deployment workflow.

## Information architecture

The section structure was informed by the [NeurIPS 2025 workshop call](https://neurips.cc/Conferences/2025/CallForWorkshops), [NeurIPS 2025 workshop guidance](https://neurips.cc/Conferences/2025/CallForWorkshopsGuidance), and [ICML 2025 workshop call](https://icml.cc/Conferences/2025/CallForWorkshops). The fictional event content does not claim affiliation with those conferences.
