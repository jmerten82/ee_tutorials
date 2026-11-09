# CLAUDE.md

Print-first, hands-on electrical engineering courses. Each tutorial folder holds one Markdown README that builds into a web page and an A4 PDF. There is no application code; the "product" is the course text, its drawings and the generated HTML/PDF.

## Tutorials

| Folder | Course | Output name |
| --- | --- | --- |
| `soldering/` | Hands-On Soldering (incl. the REASON practice track, Lesson 6) | `soldering-course` |
| `esp32/` | ESP32 Hands-On (ESP32-DevKitC V4, Arduino-ESP32 core 3.x) | `esp32-course` |
| `teensy41/` | Teensy 4.1 Hands-On (Teensyduino) | `teensy41-course` |
| `oscilloscope/` | Oscilloscope buying guide and measurement map | `oscilloscope-guide` |
| `sds804x-hd/` | Oscilloscope Hands-On for the Siglent SDS804X HD | `sds804x-hd-course` |
| `dynamixel/` | DYNAMIXEL Hands-On (X-series servos, U2D2, Python SDK) | `dynamixel-course` |
| `xiao-interlock/` | Safe Actuator Control: interlock and fire controller on the XIAO RP2040 | `xiao-interlock-course` |
| `power-usb/` | Power and USB for Multi-Board Builds | `power-usb-course` |

The user owns a Siglent SDS804X HD, an ESP32-DevKitC V4 and a Teensy 4.1, and works on a Mac.

The user is building **REASON**: towers with DYNAMIXEL servos, CH334F USB hubs fed by Pololu D36V28F5 bucks, a XIAO RP2040 fire controller behind a key/E-stop relay interlock, MOSFET modules, a WS2812 ring and a 12 V supply. Soldering Lesson 6 lists the wires (W1 to W31); the `dynamixel/`, `xiao-interlock/` and `power-usb/` courses build on it. REASON's own build page is the authority: courses state their assumptions (servo model, pin choices) instead of inventing details.

## Commands

```sh
node tools/build-all.mjs [tutorial ...]          # drawings + HTML + PDF for each, then the link check
node tools/render-diagrams.mjs <tutorial> [NN]   # JSX -> diagrams/*.svg and diagrams/print/*.svg
node tools/build-course.mjs <tutorial> [--letter] [--html-only]
node tools/preview-diagrams.mjs <tutorial> <out.png> NN ...   # contact sheet of print drawings
node tools/check-links.mjs                       # relative links, images and #anchors in all Markdown
```

Node 18+, Google Chrome and (optional) Swift; no npm install. Write scratch files such as contact sheets outside the repository.

## Rules

- **The README is the source.** Never edit generated files (`*.html`, `*.pdf`, `diagrams/*.svg`, `diagrams/print/*.svg`) by hand. After changing a README or a drawing, rebuild that tutorial and commit the source and the generated files together.
- **Keep links working.** Cross-course links are `../<folder>/README.md#<github-anchor>`. Renaming a heading changes its anchor; run `node tools/check-links.mjs` and fix every hit. It must report 0 problems.
- **Keep the course skeleton**: subtitle with `Last updated`, "How to use this course" with the lesson table and `### Related courses`, kit list, `## Lesson N:` with a `**Goal:** … **Time:** … **Pass:** …` paragraph, `### Exercise N.M:` with numbered steps and `**Test:**`, Troubleshooting table, `### Card X:` cards and `### Practice log`. Update `Last updated` when you change a course's content.
- **Use only the Markdown subset** the build supports (see docs/authoring.md): no inline HTML, no pipes inside table cells, images on their own line followed by a caption paragraph, callouts as `> **Warning:**`, `> **Tip:**` or `> **Note:**`.
- **Drawings**: 760 px wide, colours only via the four `var(--cds-…)` tokens, unique `id`s per course (prefix markers), no variable named `h`. Check every changed drawing on a contact sheet for overlapping labels before building.
- **Verify the PDF** after structural changes: page breaks, wide tables, drawings, contents page numbers.
- **Style**: plain English, British spelling, one action per step, units with a space (`3.3 V`, `10 µs/div`), names of menus/keys/APIs exactly as printed. Sketches must be complete and use current APIs (ESP32 core 3.x: `ledcAttach`/`ledcWrite(pin, …)`).
- **Facts about hardware** come from datasheets and manuals, listed under `## Sources`. Say so when something could not be verified. Never invent menu paths or specs.
- **Safety** stays explicit: 3.3 V GPIOs, common ground, flyback diodes, never mains, and the scope's probe ground is mains earth.
- **Cross-course linkage**: a new course or exercise that relates to another gets entries in both directions (Related courses, "With a scope"-style tips, the root README's topic map).

## More

- [docs/authoring.md](docs/authoring.md): full Markdown subset, config options, drawing rules, linking conventions, new-course checklist.
- [README.md](README.md): reader-facing overview, learning path and the cross-course topic map.
