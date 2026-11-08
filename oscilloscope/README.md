# An Oscilloscope for the EE Tutorials: What to Buy and What to Measure

*A buying guide and a map of oscilloscope measurements for the soldering, ESP32 and Teensy 4.1 courses in this repository. Last updated 2026-11-07.*

**Printable version:** print [`oscilloscope-guide.pdf`](oscilloscope-guide.pdf). It has the whole guide, two cut-out bench cards and a measurement log. You can also read [`oscilloscope-guide.html`](oscilloscope-guide.html) in a browser. From the repository root, `node tools/build-course.mjs oscilloscope` rebuilds both (it needs Google Chrome).

## How to use this guide

The three courses so far get by with a multimeter and a USB power meter. A meter shows one number, averaged over a fraction of a second. A scope shows the voltage over time, from nanoseconds to seconds, so you can see what the meter averages away: bounce, PWM, ripple, spikes, bus traffic and current bursts. The courses already hint at this. [Teensy Exercise 1.6](../teensy41/README.md#exercise-16-how-fast-is-a-pin) times a pin "without an oscilloscope", and [ESP32 Exercise 1.3](../esp32/README.md#exercise-13-see-the-bounce) counts bounces in software because it cannot show them.

This guide has four parts:

1. **Which scope to buy**, with a recommendation and the alternatives.
2. **Safety and probing**: the few rules that protect you, the scope and the board.
3. **Uses, course by course**: for each existing exercise where a scope adds something, what to probe and what you should see.
4. **A proposed fourth tutorial**, "Oscilloscope Hands-On", built from those uses.

Most buying information comes from hobbyist review sites and forums, not manufacturer datasheets. Prices and bundled options change, so check the current spec sheet and listing before you buy. The sources are listed at the end.

### Related courses

- [Oscilloscope Hands-On](../sds804x-hd/README.md) is the full course that grew out of this guide, written for the Siglent SDS804X HD.
- The measurement tables below point into [Hands-On Soldering](../soldering/README.md), [ESP32 Hands-On](../esp32/README.md) and [Teensy 4.1 Hands-On](../teensy41/README.md); those courses link back with **With a scope** tips.

## Which scope to buy

### The short answer

Buy a **4-channel, 12-bit entry bench scope**: the **Rigol DHO804** or the **Siglent SDS804X HD**, about 330 to 360 US dollars. Add an **8-channel USB logic analyzer** (about 15 dollars, used with the free PulseView/sigrok software) for long digital captures.

Why this class fits these courses:

- **4 channels.** Several exercises need more than two signals at once: SDA, SCL and the 3V3 rail for I2C; gate, drain and a current shunt for the MOSFET lessons; button, ISR debug pin and rail for interrupts.
- **12-bit resolution.** An 8-bit scope has 256 levels across the screen; 12-bit has 4096. That matters for millivolt ripple on a 3.3 V rail, ADC noise and the small voltage across a current shunt.
- **Bandwidth of 70 to 100 MHz or more.** Teensy pin edges are a few nanoseconds; the shortest rise time a scope shows is about 0.35 divided by its bandwidth (3.5 ns at 100 MHz). Everything in these courses is slower than that.
- **Deep memory, single-shot trigger, math, FFT and serial decoding** are all standard in this class. Check which decoders are included free; CAN in particular can be a paid option on some Rigol models.

Choose between the two by preference. Reviews pick the DHO800 series as the best overall budget scope, with strong community support and a touchscreen. The SDS800X HD has more sample rate and memory for the money (2 GSa/s and 50 Mpts per channel across the line) and Siglent often includes CAN and LIN decoding. One source reports reliability concerns with early DHO800 units, so buy from a dealer with an easy return.

### The options compared

| Option | Approx. price | Strengths | Weaknesses | Verdict for these courses |
| --- | --- | --- | --- | --- |
| **Rigol DHO804** (DHO802 = 2 ch) | from about $330 | 12-bit, touchscreen, deep memory, large community, USB-C powered | Lower max sample rate and memory than the Siglent; early units had reliability reports | **Recommended** |
| **Siglent SDS804X HD** (SDS802X HD = 2 ch) | from about $360 | 12-bit, 2 GSa/s, 50 Mpts per channel, low noise floor, CAN/LIN often included | No touchscreen; smaller community than Rigol | **Recommended** |
| Rigol DS1054Z | lower, often used | 4 ch, deep memory, decoding included, the classic starter scope | 8-bit, older interface | Good if bought used and cheap |
| Siglent SDS1104X-E | similar to the HD models | 4 ch, full decoder suite unlocked | 8-bit | Good, but the HD models are better value now |
| Digilent Analog Discovery 3 | about $380 to $430 | 16-channel logic analyzer, signal generator, power supply, all in one USB box | As a scope: 2 ch, 125 MSa/s, 32 kpts memory | Second instrument, not your only scope |
| FNIRSI handheld scopes | under $150 | Cheap, portable | No serial decoding, shallow memory | Skip for these courses |
| USB logic analyzer (8 ch, PulseView) | about $15 | Long I2C, UART and SPI captures with reliable decoding | Digital only, no voltages | **Buy alongside the scope** |

### What to look for in the specs

- **Bandwidth:** at least 5 times the highest frequency you care about, and enough for the edges (0.35 / bandwidth = shortest visible rise time). 70 to 100 MHz covers every exercise here.
- **Sample rate:** at least 5 times the bandwidth when all channels you use are on. Check the per-channel figure with 4 channels active.
- **Memory depth:** megapoints, not kilopoints. Deep memory keeps the sample rate high on long timebases, for example a whole ESP32 wake cycle of 2 s at full detail.
- **Triggers:** edge, pulse width, runt and serial-bus triggers, plus single-shot and Normal modes.
- **Math:** CH1 minus CH2 (for CAN and for measuring across a shunt) and integration (charge per wake cycle).
- **Decoders:** UART, I2C and SPI as a minimum; CAN for [Teensy Lesson 6](../teensy41/README.md#lesson-6-talking-to-other-things).
- **Earth lead and power:** USB-C powered scopes ship with a separate safety earth lead; read the manual on when to use it.

### Accessories

- [ ] The four 10× passive probes that come with the scope, with their **short ground springs** (keep them in the probe pouch, not lost in the box)
- [ ] Current-sense shunt resistors: 1 Ω and 0.1 Ω, 1 %, 1 W or more (ESP32 Lessons 3 and 6)
- [ ] A 1N5819 Schottky diode across the 1 Ω shunt for sleep measurements (it limits the drop if the current suddenly rises)
- [ ] Short jumper leads with mini-grabber hooks for SMD pins
- [ ] A few 100 Ω resistors and 100 nF and 1 µF capacitors for RC filters
- [ ] An 8-channel USB logic analyzer and PulseView

## Safety and probing

### Bench rules for the scope

- **The probe ground clip is connected to mains earth.** On a mains-powered scope, every probe ground is joined to the scope chassis and to the earth pin of the plug. Clip it only to the GND of the circuit you are probing. Clipped onto the 12 V rail, it shorts the adapter through the scope.
- **Never probe mains with a standard probe.** Mains measurements need a rated differential probe. Nothing in these courses needs mains.
- **All probe grounds are the same node.** Two ground clips on two different nodes short those nodes together. Measure a voltage that is not referenced to GND (across a shunt on the high side, or CANH to CANL) with two probes and the CH1 minus CH2 math function.
- **USB-powered scopes and laptops.** A USB-C powered scope may or may not be earthed, depending on its supply. A laptop on battery floats. Read the scope's safety notice, and use the supplied earth lead as the manual says.
- **Mind the input rating.** The safe input voltage of the scope and of the probe at 1× and 10× is printed on both. The 12 V circuits here are far below it; flyback spikes without a diode can reach tens of volts, which is still within a 10× probe's range.

### Getting a true picture

1. **Compensate every 10× probe** on the scope's calibration output before the first measurement. The square wave must have flat tops: no rounded corners (under-compensated) and no overshoot (over-compensated).
2. **Use 10×, not 1×,** for anything but tiny slow signals. At 1× the probe's bandwidth falls to a few MHz and its capacitance loads the circuit.
3. **Use the short ground spring for fast edges.** The long ground lead forms an inductive loop that rings on fast edges and invents spikes that are not in the circuit. This matters most on Teensy pin edges and on the MOSFET drain.
4. **Measure where the event happens.** A flyback spike is largest at the MOSFET drain; supply sag is largest at the board's 3V3 pin, not at the adapter.
5. **Know what the trigger is doing.** Auto mode redraws even with no trigger; Normal waits for one; Single captures one event and stops. Bounce, brownouts and intermittent joints need Normal or Single.

### The debug-pin trick

Many uses below need you to see when code runs. Pick a free pin, set it HIGH at the start of the code you want to time and LOW at the end, and probe it next to the analog signal. On the Teensy use `digitalWriteFast()`; on the ESP32 use `digitalWrite()` or the GPIO set/clear registers. The pulse width is the code's run time, and the delay from an input edge to the pulse is its latency.

## Uses in the ESP32 course

| Exercise | What to probe | What you should see and learn |
| --- | --- | --- |
| [0.5](../esp32/README.md#exercise-05-measure-the-rails) Measure the rails | 3V3 and 5V pins, AC-coupled, 10 to 50 mV/div | The ripple and short dips the meter averages away; with Wi-Fi running (Lesson 5) the dips become bigger |
| Boot modes and strapping pins | GPIO0, 2, 5, 12, 14 and 15 during reset | Which pins pulse or are driven at boot; why GPIO14 is noted as "pulses at boot" and why straps are on the careful list |
| **[1.3](../esp32/README.md#exercise-13-see-the-bounce) See the bounce** | GPIO33, Single trigger on the falling edge, 200 µs/div | The real bounce train of a button and of a bare wire. Measure its length; it gives the debounce time for 1.4 instead of a guess |
| [1.5](../esp32/README.md#exercise-15-interrupts) Interrupts | Button on CH1, a debug pin toggled in the ISR on CH2 | Interrupt latency (edge to toggle) and its jitter with persistence on; extra ISR calls caused by bounce |
| [2.1](../esp32/README.md#exercise-21-fade-an-led) Fade an LED | The PWM pin, then the same signal after a 10 kΩ / 1 µF RC filter | The square wave behind the 1.65 V meter reading; frequency and duty cycle; the filter turning it into DC with ripple |
| [2.2](../esp32/README.md#exercise-22-position-a-servo) Position a servo | The servo signal pin | A 50 Hz frame with a 1 to 2 ms pulse; check the endpoints against the servo's specification |
| [2.3](../esp32/README.md#exercise-23-read-a-knob) and [2.4](../esp32/README.md#exercise-24-measure-12-v-with-a-divider) ADC | The knob wiper and the divider midpoint, AC-coupled | Noise and Wi-Fi interference on the input; the effect of a 100 nF capacitor from the divider to GND |
| **[3.1](../esp32/README.md#exercise-31-switch-a-12-v-load-on-and-off) and [3.2](../esp32/README.md#exercise-32-speed-control-with-pwm) MOSFET** | Gate, drain and a 0.1 Ω shunt in the source leg | The drain spike when the motor turns off, with and without D1 (safe at 12 V); gate edges with R1 = 0 Ω and 100 Ω; motor current ripple at 20 kHz |
| [4.2](../esp32/README.md#exercise-42-scan-the-bus) Scan the bus | SDA and SCL, I2C decode on | Address, ACK and NACK for every address the scanner tries |
| [4.3](../esp32/README.md#exercise-43-read-the-bme280) and [4.4](../esp32/README.md#exercise-44-show-it-on-the-oled) I2C sensor and OLED | SDA rise time, 30 % to 70 % of VDD | Rise time with internal pull-ups only, with 4.7 kΩ and with 2.2 kΩ. Fast-mode (400 kHz) allows 300 ns. Bus capacitance follows from C ≈ tR / (0.847 × R) |
| **[5.1](../esp32/README.md#exercise-51-join-the-network) Join the network** | 3V3 pin, Normal trigger on a dip below about 3.1 V | The rail sagging in Wi-Fi transmit bursts; compare a good and a bad USB cable and the 470 µF capacitor from Troubleshooting |
| **[6.2](../esp32/README.md#exercise-62-measure-the-current) Measure the current** | Voltage across a shunt in the supply ground return (1 Ω for sleep, 0.1 Ω for Wi-Fi) | The whole wake, Wi-Fi, sleep profile; transmit peaks of about 240 mA (sometimes over 400 mA); integrate with scope math to get charge per wake for a better battery-life estimate |
| [7](../esp32/README.md#lesson-7-capstone-a-room-climate-monitor) Capstone | Debug pins around measure, display, serve and sleep | How long each phase of the cycle takes, and where the energy goes |

> **Note:** A single shunt cannot cover both deep sleep (microamps) and Wi-Fi bursts (hundreds of milliamps). A 1 Ω shunt drops 0.24 V at 240 mA and can brown out the board; a 0.1 Ω shunt shows only 0.5 µV at 5 µA. Measure sleep and active separately, or use the diode across the 1 Ω shunt. On a DevKitC, the USB bridge and regulator add milliamps in sleep; that is the board, not the module.

## Uses in the Teensy 4.1 course

| Exercise | What to probe | What you should see and learn |
| --- | --- | --- |
| [0.5](../teensy41/README.md#exercise-05-measure-the-power-rails) Measure the power rails | 3.3 V and VIN, AC-coupled | Ripple and noise; compare USB power from the Mac and from a hub |
| **[1.6](../teensy41/README.md#exercise-16-how-fast-is-a-pin) How fast is a pin?** | Pin 11 with the ground spring, 5 to 20 ns/div | The real square wave behind the meter's half-of-3.3 V reading: frequency, rise time and ringing at 600 MHz and 150 MHz. Compare with the `ARM_DWT_CYCCNT` numbers |
| [1.2](../teensy41/README.md#exercise-12-read-a-button-and-meet-bounce) and [1.3](../teensy41/README.md#exercise-13-debounce-with-the-bounce2-library) Bounce | The button pin, Single trigger | The bounce train; check that Bounce2's interval is longer than the bounce |
| [1.4](../teensy41/README.md#exercise-14-several-things-at-once-with-elapsedmillis) and [1.5](../teensy41/README.md#exercise-15-intervaltimer-and-interrupts) elapsedMillis, IntervalTimer | A debug pin per task, infinite persistence | Timer jitter, and how much of the loop each task uses |
| [2.2](../teensy41/README.md#exercise-22-noise-and-averaging) Noise and averaging | The analog input, AC-coupled | The noise before and after averaging, and with a capacitor at the pin |
| [2.4](../teensy41/README.md#exercise-24-fade-an-led-with-pwm) and [2.5](../teensy41/README.md#exercise-25-switch-12-v-with-a-mosfet) PWM and MOSFET | The gate pin, the drain, a shunt | The 20 kHz from `analogWriteFrequency`; the flyback spike with and without the 1N5819; the supply dip when the motor starts (the Brownouts section in Troubleshooting) |
| [3.2](../teensy41/README.md#exercise-32-the-usb-midi-controller) USB MIDI controller | Debug pins around the scan loop | Scan time and latency from a button press to the MIDI send |
| [4.3](../teensy41/README.md#exercise-43-the-data-logger) The data logger | A debug pin around each SD `write()`, and the 3.3 V rail | Write latency spikes when the card erases a block, and their current bursts; why a buffer prevents dropped samples |
| **[5.1](../teensy41/README.md#exercise-51-first-sound) and [5.2](../teensy41/README.md#exercise-52-a-synth-you-play-over-usb-midi) MQS audio** | MQS pins 10 and 12, raw and after an RC filter | The high-frequency PWM carrier, then the audio waveform; use FFT to compare sine, square and saw harmonics and to see aliasing |
| [6.1](../teensy41/README.md#exercise-61-hardware-serial-ports) Hardware serial ports | TX pin, UART decode | The frame bits; the measured baud rate; what a baud mismatch looks like in the decoder |
| [6.2](../teensy41/README.md#exercise-62-an-i2c-sensor-and-an-oled) I2C sensor and OLED | SDA and SCL | Decoding and rise time, as in the ESP32 table |
| **[6.3](../teensy41/README.md#exercise-63-can-bus-with-flexcan_t4) CAN bus** | CANH on CH1, CANL on CH2, math CH1 minus CH2 | The dominant and recessive levels, the bit time at your bit rate, and edges with and without the 120 Ω terminators; decode if your scope includes CAN |
| [7](../teensy41/README.md#lesson-7-capstone-the-teensy-desk-synth) Capstone desk synth | Audio output and debug pins | Audio buffer timing, control-loop timing and output waveform under load |

## Uses in the soldering course

| Exercise | What to probe | What you should see and learn |
| --- | --- | --- |
| **[2.3](../soldering/README.md#exercise-23-build-a-555-led-blinker) Build a 555 LED blinker** | Output pin 3, and the timing capacitor | Frequency and duty cycle against f = 1.44 / ((R1 + 2 × R2) × C); the capacitor ramping between 1/3 and 2/3 of the supply |
| Inspection and troubleshooting | A signal or rail through a suspect joint, Normal trigger | An intermittent joint: tap the board and catch the dropout on screen |
| [5](../soldering/README.md#lesson-5-capstone-kit-build) Capstone kit build, first power-up | Rails and any oscillator on the kit | That the kit works electrically, not just that it does not smoke |
| [6.5](../soldering/README.md#exercise-65-the-interlock-board-rehearsal-for-w23-w24-w26-w31) The interlock board | The relay coil, the level shifter input and output | The coil spike with and without the flyback diode; the level shifter's edges and delay |
| [6.1](../soldering/README.md#exercise-61-usb-cable-surgery-do-3) USB cable surgery | 5 V and GND under load | Voltage drop and noise through your repaired cable compared with a factory cable |

## Proposed fourth tutorial: Oscilloscope Hands-On

> **Note:** This course now exists: see [Oscilloscope Hands-On](../sds804x-hd/README.md), written for the Siglent SDS804X HD.

A course in the same format as the others (README, web page, A4 PDF, drawings in `diagrams/`), using the ESP32 or Teensy you already have as the circuit under test. Every lesson reuses circuits from the existing courses, so there is little new to buy.

| Lesson | Skill | Built on | Pass criterion |
| --- | --- | --- | --- |
| 0 | Safety, grounding, probe compensation, 1× and 10×, the bandwidth rule | Calibration output | All probes compensated; you can explain why the ground clip goes only to GND |
| 1 | Vertical, horizontal and trigger controls; automatic measurements | ESP32 2.1 PWM | Frequency and duty cycle read within 1 % of the sketch's settings |
| 2 | Normal and Single trigger, pulse-width trigger | Button bounce, 555 blinker | A captured bounce train with its length measured |
| 3 | Analog: AC coupling, ripple, RC filters, ADC noise, FFT | Rails, knob, MQS audio | Ripple measured in mV; an FFT that shows the PWM carrier |
| 4 | Power: shunts, Wi-Fi bursts, brownouts, sleep profiles | ESP32 5.1 and 6.2 | A wake-cycle charge figure from scope math that predicts battery life |
| 5 | Switching: gate and drain, flyback, ground-lead artifacts | ESP32 3.2, Teensy 2.5 | Spike amplitude with and without the diode, and with long and short ground leads |
| 6 | Buses: UART, I2C rise time and decoding, CAN differential | ESP32 4.3, Teensy 6.1 and 6.3 | A pull-up value chosen from a measured rise time |
| 7 | Capstone: full timing and power characterization | ESP32 climate monitor or Teensy desk synth | A one-page measurement report for your capstone |

Drawings worth making for it: the probe and its ground loop, trigger modes on a bounce train, shunt placement (low side and high side), an annotated I2C rise-time capture, and the CAN differential view.

## Reference cards and measurement log

### Card A: Before you probe

- [ ] Probe set to 10×, and the scope channel set to 10× to match
- [ ] Probe compensated on the calibration output today
- [ ] Ground clip goes to circuit GND, and to nothing else
- [ ] Not probing mains, and not probing across a component with the ground clip
- [ ] Ground spring fitted for edges, spikes and switching nodes
- [ ] Trigger mode chosen: Auto to find the signal, Normal or Single to catch an event
- [ ] Coupling chosen: DC for levels, AC for ripple

### Card B: Numbers and formulas

- **Shortest visible rise time** ≈ 0.35 / bandwidth (100 MHz: 3.5 ns)
- **Bandwidth needed** ≥ 5 × the highest signal frequency
- **Timebase for a periodic signal:** 2 to 5 periods across the screen; one period = 1 / frequency
- **Shunt current:** I = V / R (0.1 Ω: 1 mV = 10 mA; 1 Ω: 1 mV = 1 mA)
- **I2C rise time:** 30 % to 70 % of VDD; Standard-mode 1000 ns, Fast-mode 300 ns; C ≈ tR / (0.847 × R)
- **RC low-pass corner:** f = 1 / (2π × R × C) (10 kΩ and 1 µF: 16 Hz)
- **555 astable:** f = 1.44 / ((R1 + 2 × R2) × C)
- **Charge per wake:** integrate the shunt current over the cycle; battery life ≈ capacity / average current

### Measurement log

| Date | Course and exercise | Signal and probe point | Settings | Result | Notes |
| --- | --- | --- | --- | --- | --- |
| &nbsp; | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &nbsp; |

## Sources

The buying advice and many measurement notes come from hobbyist review sites and forum threads. Treat their specific numbers as rules of thumb and check the manufacturer's documentation.

- Buying guides: [Best Budget Oscilloscope 2026](https://electronicsbenchhq.com/posts/best-budget-oscilloscope/), [Rigol vs Siglent 2026](https://hobbyistscope.com/guides/rigol-vs-siglent), [Best Oscilloscopes for Hobbyists](https://www.smashingrobotics.com/best-oscilloscopes-for-hobbyists/), [Best Oscilloscope for Arduino Projects](https://hobbyistscope.com/guides/best-oscilloscope-for-arduino), [Oscilloscope vs Logic Analyzer](https://hobbyistscope.com/guides/oscilloscope-vs-logic-analyzer), [Analog Discovery 3 review](https://hobbyistscope.com/reviews/digilent-analog-discovery-3), [AD3 vs FNIRSI 1014D](https://hobbyistscope.com/compare/digilent-analog-discovery-3-vs-fnirsi-1014d)
- Microcontroller measurements: [Six Oscilloscope Measurements with an Arduino](https://www.baldengineer.com/six-oscilloscope-measurements-using-arduino.html), [Triggering and Decoding Serial Protocols](https://www.baldengineer.com/triggering-and-decoding-serial-protocols-on-an-oscilloscope-workbench-wednesdays-34.html), [Learn to use an oscilloscope](https://aioscilloscope.com/learn/), [Oscilloscope beginner's guide](https://www.wavtron.in/blog/oscilloscope-beginners-guide)
- Safety and grounding: [EEVblog: mains with a DHO804](https://eevblog.com/forum/beginners/is-it-safe-to-measure-mains-voltage-with-my-rigol-dho804), [EEVblog: probe ground and USB](https://www.eevblog.com/forum/beginners/probe-oscilloscope-ground-blow-up-issues-usb/75), [Tech Explorations: precautions](https://techexplorations.com/guides/tools/oscilloscope/precautions/)
- ESP32 power: [Profiling ESP32 power consumption](https://hubble.com/community/guides/how-to-profile-esp32-power-consumption-accurately/), [ESP32_MULTI_METER](https://github.com/har-in-air/ESP32_MULTI_METER), [ESP32 Wi-Fi and low-power modes](https://hackaday.io/project/193628/log/225599-example-esp32-wifi-and-low-power-modes), [Starting Wi-Fi trips brownout](https://esp32.com/viewtopic.php?p=21162)
- Switching and flyback: [Arduino PWM transient spikes](https://industrialmonitordirect.com/blogs/knowledgebase/arduino-pwm-transient-spikes-oscilloscope-vs-reality), [Flyback for DC motor](https://forum.allaboutcircuits.com/threads/flyback-for-dc-motor.159992/)
- Teensy timing and pins: [Arduino_Timing](https://github.com/drmcnelson/Arduino_Timing), [Teensy 4.1 IRQ timing](https://graeme-winter.github.io/2024/03/2024-03-09.html), [Teensy 4.1 with Audio Adapter pin usage](https://protosupplies.com/wp-content/uploads/2024/01/Project-System-for-Teensy-4.1-with-Audio-Adapter-Pin-Usage-2.pdf), [PJRC Teensy 4.1](https://pjrc.com/store/teensy41.html)
- I2C: [Analog Devices: I²C Cabling](https://www.analog.com/en/resources/technical-articles/i2c-cabling.html), [Würth ANP121b](https://www.we-online.com/components/media/o734709v410%20ANP121b%20EN.pdf), [I2C pull-up resistor calculation](https://www.nextpcb.com/blog/i2c-pull-up-resistor-calculation)
- Audio and FFT: [DDS FFT harmonics](https://forum.allaboutcircuits.com/threads/1khz-dds-fft-sub-first-harmonic.174918/), [Soundcard scope for PWM](https://budgetlightforum.com/t/using-soundcard-oscilloscope-software-to-measure-pwm/56958), [Oscar scope and spectrum analyser](https://github.com/dchwebb/Oscar)
