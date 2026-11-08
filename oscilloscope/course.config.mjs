// Settings for tools/build-course.mjs: node tools/build-course.mjs oscilloscope
export default {
  name: 'oscilloscope-guide',
  short: 'Oscilloscope Guide',
  printNote: 'Cut out the two bench cards along the dashed lines; fill in the measurement log with a pen.',
  css: `
#measurement-log + .table-wrap td { height: 11mm; }
#measurement-log { break-before: page; }
`,
};
