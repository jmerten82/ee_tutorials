# ee_tutorials

My tutorials towards electrical engineering: print-first, hands-on courses with a goal, numbered exercises and a pass criterion in every lesson. Each one is a Markdown README that builds into a web page and an A4 PDF with high-contrast drawings, cut-out reference cards and fill-in worksheets.

## Tutorials

| Tutorial | What it covers | Bench time | Web page | Print |
| --- | --- | --- | --- | --- |
| [Hands-On Soldering](soldering/README.md) | From first joint to drag-soldering SMD, plus a practice track for every joint in the REASON build (Lesson 6) | about 18 h | [soldering-course.html](soldering/soldering-course.html) | [soldering-course.pdf](soldering/soldering-course.pdf) |
| [ESP32 Hands-On](esp32/README.md) | ESP32-DevKitC V4 with Arduino IDE 2: pins and boot modes, digital I/O, PWM and ADC, MOSFET loads, I2C sensors and OLED, Wi-Fi web page, deep sleep, and a Wi-Fi room climate monitor | about 17 h | [esp32-course.html](esp32/esp32-course.html) | [esp32-course.pdf](esp32/esp32-course.pdf) |
| [Teensy 4.1 Hands-On](teensy41/README.md) | Teensy 4.1 with Teensyduino: 3.3 V rules, timing, analog and PWM, USB MIDI and keyboard, SD logging, MQS audio synth, serial/I2C/CAN/USB host, and a desk synth capstone | about 20 h | [teensy41-course.html](teensy41/teensy41-course.html) | [teensy41-course.pdf](teensy41/teensy41-course.pdf) |
| [Oscilloscope Guide](oscilloscope/README.md) | Which scope to buy (Siglent SDS804X HD, Rigol DHO804 and alternatives), probing safety, and what a scope shows in every exercise of the courses above | reading | [oscilloscope-guide.html](oscilloscope/oscilloscope-guide.html) | [oscilloscope-guide.pdf](oscilloscope/oscilloscope-guide.pdf) |
| [Oscilloscope Hands-On](sds804x-hd/README.md) | General oscilloscope skills, tailored to the Siglent SDS804X HD: probes, triggering, measurements and sampling, smart triggers and History, ripple and FFT, edges and ground leads, current shunts, MOSFET switching, UART/I2C/CAN decoding, and a measurement-report capstone | about 20 h | [sds804x-hd-course.html](sds804x-hd/sds804x-hd-course.html) | [sds804x-hd-course.pdf](sds804x-hd/sds804x-hd-course.pdf) |

## Where to start

The courses build on each other, but only loosely:

1. **[Hands-On Soldering](soldering/README.md), Lessons 0 to 2.** Enough to solder headers and build on perfboard. The microcontroller courses assume it.
2. **[ESP32 Hands-On](esp32/README.md) or [Teensy 4.1 Hands-On](teensy41/README.md), in either order.** They teach the same basics (digital I/O, bounce, PWM, analog inputs, MOSFET switching, I2C) and then go different ways: Wi-Fi, deep sleep and battery life on the ESP32; USB devices, audio, SD logging and CAN on the Teensy.
3. **[Oscilloscope Guide](oscilloscope/README.md)** once the multimeter stops being enough: what to buy and what each exercise looks like on a scope.
4. **[Oscilloscope Hands-On](sds804x-hd/README.md)** after at least ESP32 Lessons 0 to 4. It measures the circuits you already built, and uses the ESP32 as its signal generator.
5. **Soldering Lessons 3 to 6** at any point: rework, surface mount, a kit build, and the REASON practice track.

Every course has a **Related courses** section near its start. The ESP32, Teensy and soldering courses also carry **With a scope** tips at the exercises the oscilloscope course measures.

## How the courses connect

The same topics come up in several courses. Numbers are exercises; follow them across a row to see one idea from different sides.

| Topic | Soldering | ESP32 | Teensy 4.1 | Oscilloscope |
| --- | --- | --- | --- | --- |
| Soldering headers onto a module | [6.4](soldering/README.md#exercise-64-straight-headers-on-modules) | – | [0.1](teensy41/README.md#exercise-01-solder-the-headers) | – |
| Button bounce and debouncing | – | [1.3](esp32/README.md#exercise-13-see-the-bounce), [1.4](esp32/README.md#exercise-14-debounce-in-software) | [1.2](teensy41/README.md#exercise-12-read-a-button-and-meet-bounce), [1.3](teensy41/README.md#exercise-13-debounce-with-the-bounce2-library) | [3.1](sds804x-hd/README.md#exercise-31-single-shot-see-the-bounce) |
| Interrupts, timers and code timing | – | [1.5](esp32/README.md#exercise-15-interrupts) | [1.4](teensy41/README.md#exercise-14-several-things-at-once-with-elapsedmillis), [1.5](teensy41/README.md#exercise-15-intervaltimer-and-interrupts), [1.6](teensy41/README.md#exercise-16-how-fast-is-a-pin) | [3.4](sds804x-hd/README.md#exercise-34-interrupt-latency), [5.1](sds804x-hd/README.md#exercise-51-how-fast-is-a-teensy-pin) |
| PWM: dimming, speed, servos | – | [2.1](esp32/README.md#exercise-21-fade-an-led), [2.2](esp32/README.md#exercise-22-position-a-servo) | [2.4](teensy41/README.md#exercise-24-fade-an-led-with-pwm) | [2.1](sds804x-hd/README.md#exercise-21-automatic-measurements), [4.2](sds804x-hd/README.md#exercise-42-filter-a-pwm-into-a-dc-level) |
| Analog inputs, dividers and noise | – | [2.3](esp32/README.md#exercise-23-read-a-knob), [2.4](esp32/README.md#exercise-24-measure-12-v-with-a-divider) | [2.1](teensy41/README.md#exercise-21-read-a-knob), [2.2](teensy41/README.md#exercise-22-noise-and-averaging), [2.3](teensy41/README.md#exercise-23-a-battery-voltmeter) | [4.3](sds804x-hd/README.md#exercise-43-clean-up-a-noisy-trace) |
| Switching 12 V loads with a MOSFET | [6.5](soldering/README.md#exercise-65-the-interlock-board-rehearsal-for-w23-w24-w26-w31) | [3.1](esp32/README.md#exercise-31-switch-a-12-v-load-on-and-off), [3.2](esp32/README.md#exercise-32-speed-control-with-pwm) | [2.5](teensy41/README.md#exercise-25-switch-12-v-with-a-mosfet) | [Lesson 7](sds804x-hd/README.md#lesson-7-switching-loads) |
| I2C sensors and displays | – | [Lesson 4](esp32/README.md#lesson-4-sensors-and-a-display-on-i2c) | [6.2](teensy41/README.md#exercise-62-an-i2c-sensor-and-an-oled) | [8.2](sds804x-hd/README.md#exercise-82-i2c-decode), [8.3](sds804x-hd/README.md#exercise-83-i2c-rise-time-and-pull-ups) |
| Serial (UART) | – | [0.3](esp32/README.md#exercise-03-hello-from-the-chip) | [6.1](teensy41/README.md#exercise-61-hardware-serial-ports) | [8.1](sds804x-hd/README.md#exercise-81-uart) |
| CAN bus | – | – | [6.3](teensy41/README.md#exercise-63-can-bus-with-flexcan_t4) | [8.4](sds804x-hd/README.md#exercise-84-can) |
| Power rails, brownouts and current | [6.1](soldering/README.md#exercise-61-usb-cable-surgery-do-3) | [0.5](esp32/README.md#exercise-05-measure-the-rails), [6.2](esp32/README.md#exercise-62-measure-the-current) | [0.5](teensy41/README.md#exercise-05-measure-the-power-rails), [Troubleshooting](teensy41/README.md#brownouts-the-board-resets-when-something-switches-on) | [Lesson 6](sds804x-hd/README.md#lesson-6-power-and-current) |
| Sound and audio | – | – | [Lesson 5](teensy41/README.md#lesson-5-sound) | [4.6](sds804x-hd/README.md#exercise-46-optional-teensy-mqs-audio) |
| 555 timer | [2.3](soldering/README.md#exercise-23-build-a-555-led-blinker) | – | – | [3.7](sds804x-hd/README.md#exercise-37-optional-the-555-blinker) |
| Capstone projects | [Lesson 5](soldering/README.md#lesson-5-capstone-kit-build) | [Lesson 7](esp32/README.md#lesson-7-capstone-a-room-climate-monitor) | [Lesson 7](teensy41/README.md#lesson-7-capstone-the-teensy-desk-synth) | [Lesson 9](sds804x-hd/README.md#lesson-9-capstone-characterise-a-project) |

## Shared kit

Most hardware is bought once and reused:

- **Soldering kit** (iron, solder, flux, braid, loupe) from the soldering course: used for headers, perfboard and the USB current-sense lead.
- **Multimeter**, in every course.
- **ESP32-DevKitC V4 and its breadboard** from the ESP32 course: the device under test and signal generator in the oscilloscope course.
- **12 V adapter, IRLB8721 MOSFET, 1N5819 diode and a small motor or LED strip** from ESP32 Lesson 3 (Teensy Lesson 2 uses the same parts): measured again in oscilloscope Lesson 7.
- **BME280 sensor and SSD1306 OLED** from ESP32 Lesson 4, also used by the Teensy course.
- **SN65HVD230 CAN transceivers** from Teensy Exercise 6.3: decoded in oscilloscope Exercise 8.4.

Each course's "Everything you need for all lessons" chapter has the full list.

## Repository layout

```text
<tutorial>/README.md               the course text (the single source)
<tutorial>/course.config.mjs       build settings: file name, cover drawing, worksheets
<tutorial>/<name>.html, <name>.pdf generated web page and A4 PDF (committed)
<tutorial>/diagrams/src/*.jsx      drawing sources
<tutorial>/diagrams/*.svg          generated greyscale drawings for the web page
<tutorial>/diagrams/print/*.svg    generated high-contrast drawings for the PDF
tools/                             the dependency-free build tools
docs/authoring.md                  how the courses are written and built
CLAUDE.md                          working notes for Claude Code in this repository
```

## Building the web pages and PDFs

The tools need Node 18 or later and Google Chrome; on macOS, Swift adds page numbers to the PDF contents. There are no npm dependencies. From the repository root:

```sh
node tools/build-all.mjs                          # every tutorial: drawings, web page, PDF, then a link check
node tools/render-diagrams.mjs esp32              # one tutorial's JSX drawings -> diagrams/*.svg and diagrams/print/*.svg
node tools/build-course.mjs esp32                 # README.md -> esp32-course.html and esp32-course.pdf (A4)
node tools/build-course.mjs esp32 --letter        # US Letter PDF
node tools/preview-diagrams.mjs esp32 sheet.png 01 02   # contact sheet of drawings, to check them by eye
node tools/check-links.mjs                        # every relative link and #anchor in every README
```

See [docs/authoring.md](docs/authoring.md) for the Markdown conventions, the drawing format and the checklist for a new course.
