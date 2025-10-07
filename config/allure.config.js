// const { AllureRuntime } = require('allure-cucumberjs');
// const { CucumberJSAllureFormatter } = require('allure-cucumberjs');

// module.exports = class extends CucumberJSAllureFormatter {
//     constructor(options) {
//         super(options, new AllureRuntime({ resultsDir: './allure-results' }), {
//             labels: [
//                 { pattern: '@severity=(.*)', name: 'severity' },
//                 { pattern: '@issue=(.*)', name: 'issue' },
//                 { pattern: '@testId=(.*)', name: 'testId' }
//             ]
//         });
//     }
// };