module.exports = {
    default: {
        formatOptions: {
            snippetInterface: "async-await"
        },
        reporter:['html:reports/cucumber-report.html', 'json:reports/cucumber-report.json', '@cucumber/pretty-formatter'],
        format: [
            'progress-bar',
            'html:reports/cucumber-report.html',
            'json:reports/cucumber-report.json',
            '@cucumber/pretty-formatter'
        ],
        paths: ["src/tests/features/*.feature"],
        require: [
            "src/hooks/hooks.ts",
            "src/tests/steps/*.ts"
        ],
        requireModule: ["ts-node/register"]
    }
}
