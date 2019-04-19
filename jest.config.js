module.exports = {
  reporters: [
    "default",
    ["jest-junit", {
      suiteName: "Jest Unit Tests",
      outputDirectory: ".",
      outputName: "TEST-RESULTS.xml",
    }]
  ]
};