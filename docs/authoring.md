# Writing and building the tutorials

How the courses in this repository are written, drawn, linked and built. The tools are in [`tools/`](../tools/); they need Node 18+ and Google Chrome (Swift on macOS for PDF page numbers) and nothing from npm.

## The pipeline

```text
<tutorial>/README.md ─┐
course.config.mjs ────┼─ tools/build-course.mjs ─> <name>.html  (screen: greyscale drawings, links)
diagrams/src/*.jsx ───┘        ▲                └> <name>.pdf   (print: A4, high-contrast drawings,
        │                      │                                 contents with page numbers, cards)
        └─ tools/render-diagrams.mjs ─> diagrams/*.svg, diagrams/print/*.svg
```

- The README is the single source. GitHub renders it as is; the build turns it into the web page and the PDF.
- Generated files (HTML, PDF, both SVG sets) are committed, so the course can be read and printed without building.
- `node tools/build-all.mjs` rebuilds everything and runs the link check. `node tools/build-all.mjs esp32` rebuilds one tutorial.

## Anatomy of a course README

Every course follows the same skeleton. Keep it: readers move between courses, and the build relies on some of it.

1. `# Title` and an italic subtitle line ending in `Last updated YYYY-MM-DD.`
2. `**Shopping list:**` and `**Printable version:**` paragraphs. The printable-version paragraph is shown on GitHub and the web page and dropped from the PDF.
3. `## How to use this course`: what the course does, a lesson table (`Lesson | Skill | Bench time | Pass criterion`), a line on session length, and a `### Related courses` section that links the other tutorials.
4. Background chapters (`## The ESP32 in one page`, safety, the kit list `## Everything you need for all lessons`).
5. `## Lesson N: Title` chapters. Each starts with one paragraph `**Goal:** … **Time:** … **Pass:** …` and contains `### Exercise N.M: Title` sections with numbered steps and a `**Test:**` paragraph.
6. `## Troubleshooting`: a `Symptom | Likely cause | Fix` table, ordered by symptom.
7. `## Reference cards and practice log`: `### Card A: …` sections (cut-out cards in the PDF) and a `### Practice log` table whose first column is `Date`.
8. `## Sources` where the course relies on outside documents.

Every `##` heading becomes a chapter with a page break and a contents entry in the PDF.

## Markdown the build understands

`build-course.mjs` handles a deliberate subset. Anything else renders as plain text.

| Element | Syntax | Notes |
| --- | --- | --- |
| Headings | `#` to `######` | Anchors use the GitHub rule: lower case, punctuation removed (underscores kept), spaces to hyphens |
| Paragraphs | plain lines | Consecutive lines join into one paragraph |
| Bold, italic, code, links | `**b**`, `*i*`, `` `c` ``, `[t](href)` | No HTML, no reference-style links |
| Lists | `-`, `1.`, nested by indent | Numbered lists render as step badges |
| Task lists | `- [ ] item` | Print as empty checkboxes; kit lists put the lesson numbers in brackets: `(1, 3)` |
| Tables | pipe tables | No pipes inside cells |
| Images | `![alt](diagrams/NN-name.svg)` on its own line | The next paragraph becomes the caption; the PDF inlines the print version |
| Code | ```` ```cpp sketch_name.ino ```` | The word after the language is shown as the file label; over 45 lines gets a long-listing style |
| Callouts | `> **Warning:** …`, `> **Tip:** …`, `> **Note:** …` | Warning, Danger and Caution style as warnings; Tip and Try it as tips; anything else as a note |

Special paragraphs and headings:

- `**Goal:** …` (or `**Project goal:**`) gets the lesson-goal box.
- A paragraph that is only a bold phrase (`**Test:**` alone on a line) becomes a small label.
- A heading starting with `Card ` (or containing "tape this to the wall") starts a cut-out card that runs to the next heading.
- `### Practice log` starts a new page in the PDF; an empty table under it (first column `Date`, one row of `&nbsp;`) is printed with 17 blank rows.

## course.config.mjs

```js
export default {
  name: 'esp32-course',            // output file names: esp32-course.html / .pdf
  short: 'ESP32 Hands-On',         // running footer in the PDF
  coverFigure: 'diagrams/01-board-anatomy.svg',
  printNote: 'Text after "Printing: A4, single-sided …" on the PDF cover.',
  appendix: [                      // optional worksheets after the last chapter (PDF and web)
    { id: 'worksheet-pin-plan', title: 'Worksheet 2: project pin plan', html: '<table>…</table>' },
  ],
  css: `/* extra print/screen CSS for this course */`,
};
```

`html` may be a function `({ letter }) => string` when a worksheet must be drawn to scale for A4 or Letter. See `esp32/course.config.mjs` (actual-size pin strips) and `soldering/course.config.mjs` (score sheet, layout grid).

## Drawings

Each drawing is a small JSX file in `diagrams/src/`, named `NN-short-name.jsx`, exporting a function that returns one `<svg>`. `render-diagrams.mjs` turns it into two SVGs: greyscale for the screen and pure black, heavier-stroked for print.

```jsx
export default () => {
  const ink = 'var(--cds-text-primary)', quiet = 'var(--cds-text-secondary)',
        tint = 'var(--cds-chart-reference-tint)', rule = 'var(--cds-chart-grid)';
  return <svg viewBox='0 0 760 400' role='img' aria-label='What it shows' fontSize='13'>
    <text x='24' y='30' fontSize='15' fontWeight='600' fill={ink}>Title</text>
    <text x='24' y='50' fontSize='11.5' fill={quiet}>One-line subtitle</text>
    …
  </svg>;
};
```

Rules:

- **Width 760**, height as needed. Title at (24, 30), 15 px, weight 600; subtitle at (24, 50), 11.5 px, `quiet`; body text 13 px; labels 11 to 11.5 px.
- **Colours only through the four tokens** (`ink`, `quiet`, `tint`, `rule`) plus `#ffffff` for white fills. The renderer maps them to greyscale or to black, and print mode raises small text to 12.5 px and strokes to 1.5× (at least 1.5 px), so leave room around small labels.
- **Marker and other `id`s must be unique across the whole course** (prefix them, for example `bo-arrow`): the PDF inlines every drawing into one page, so duplicate ids collide.
- Use camelCase attributes (`strokeWidth`); they are converted to SVG names. Do not declare a variable named `h`: it is the element factory.
- Only the JSX subset in `render-diagrams.mjs` is supported: elements, attributes, `{expressions}`, `.map()`. No imports, no components.
- After any change: `node tools/render-diagrams.mjs <tutorial> [NN]`, then `node tools/preview-diagrams.mjs <tutorial> sheet.png NN …` and look at the sheet. Check for labels that overlap lines or each other, text running off the edge, and anything that would be wrong in black and white.
- Draw what the reader will see or build. A front panel or a screen drawn "by function, not exact positions" says so in its subtitle.

## Linking between courses

- Link another course with a relative path to its README and a heading anchor: `[ESP32 Exercise 1.3](../esp32/README.md#exercise-13-see-the-bounce)`. GitHub resolves it, and the build rewrites it to the other course's web page (`../esp32/esp32-course.html#…`).
- Anchors follow GitHub: `Exercise 6.3: CAN bus with FlexCAN_T4` becomes `exercise-63-can-bus-with-flexcan_t4`. Renaming a heading breaks every link to it, so run the link check.
- Each course has `### Related courses` at the end of its "How to use" chapter. When you add a course, add it to the others' Related courses, the root README's tutorial table, "Where to start" and "How the courses connect".
- An exercise that another course measures or extends gets a one-line tip at its end, for example `> **Tip:** With a scope, …` linking the exact exercise.
- `node tools/check-links.mjs` checks every relative link, image and anchor in every Markdown file. It must report 0 problems before a commit.

## Writing style

- Plain, direct English with British spelling (colour, centre, characterise). Product, menu and API names are written exactly as printed (Math, `ledcWrite()`, **Run/Stop**).
- Short sentences, one instruction per numbered step, the expected result stated. A reader at the bench with a probe in one hand must be able to follow it.
- Numbers with units and a space: `3.3 V`, `100 Ω`, `20 kHz`, `10 µs/div`. Ranges as `60 to 120 minutes`.
- Every lesson has a pass criterion that can be checked, and every exercise ends with a `**Test:**` where that makes sense.
- Sketches are complete and compile as printed: the Arduino-ESP32 core 3.x API (`ledcAttach`, not `ledcSetup`), Teensyduino for the Teensy. Credentials live in a `secrets.h` tab.
- Safety first and specific: 3.3 V logic, no 5 V on GPIOs, flyback diodes, a common ground, and never mains. A risky step says what can go wrong and how to limit it.
- Facts about specific hardware come from its datasheet or manual, listed under Sources. Where a detail could not be checked, the text says so and tells the reader where to look.

## Checklist: a new course

1. Create `<tutorial>/README.md` with the skeleton above and `<tutorial>/course.config.mjs`.
2. Draw in `<tutorial>/diagrams/src/`, render, and check the contact sheet.
3. Add `### Related courses` to the new course and to every existing one; add the course to the root README (tutorials table, "Where to start", "How the courses connect", shared kit if it reuses parts).
4. `node tools/build-all.mjs` (drawings, HTML, PDF, link check).
5. Read the PDF page by page: page breaks, tables that run off the page, drawings in print contrast, the contents page numbers, cards and log at the end.
6. Commit the README, config, drawing sources and all generated files together.
