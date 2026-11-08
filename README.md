# ee_tutorials
My tutorials towards electrical engineering.

## Tutorials

| Tutorial | What it covers | Web page | Print |
| --- | --- | --- | --- |
| [Hands-On Soldering](soldering/README.md) | From first joint to drag-soldering SMD, plus a practice track for every joint in the REASON build (Lesson 6) | [soldering-course.html](soldering/soldering-course.html) | [soldering-course.pdf](soldering/soldering-course.pdf) |
| [ESP32 Hands-On](esp32/README.md) | ESP32-DevKitC V4 with Arduino IDE 2: pins and boot modes, digital I/O, PWM and ADC, MOSFET loads, I2C sensors and OLED, Wi-Fi web page, deep sleep, and a Wi-Fi room climate monitor | [esp32-course.html](esp32/esp32-course.html) | [esp32-course.pdf](esp32/esp32-course.pdf) |
| [Teensy 4.1 Hands-On](teensy41/README.md) | Teensy 4.1 with Teensyduino: 3.3 V rules, timing, analog and PWM, USB MIDI and keyboard, SD logging, MQS audio synth, serial/I2C/CAN/USB host, and a desk synth capstone | [teensy41-course.html](teensy41/teensy41-course.html) | [teensy41-course.pdf](teensy41/teensy41-course.pdf) |

## Building the web pages and PDFs

All three use the same dependency-free tools (Node 18+ and Google Chrome; Swift on macOS adds page numbers to the PDF contents). From the repository root:

```sh
node tools/render-diagrams.mjs esp32          # JSX drawings -> diagrams/*.svg and diagrams/print/*.svg
node tools/build-course.mjs esp32             # README.md -> esp32-course.html and esp32-course.pdf (A4)
node tools/build-course.mjs esp32 --letter    # US Letter PDF
node tools/preview-diagrams.mjs esp32 sheet.png 01 02   # contact sheet of drawings, to check them by eye
```
