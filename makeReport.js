const cypress = require('cypress');
const yargs = require('yargs');
const { merge } = require('mochawesome-merge');
const marge = require('mochawesome-report-generator');
const rm = require('rimraf');
const ls = require('ls');
const argv = yargs.options({
    'browser': {
        alias: 'b',
        describe: 'choose browser that you wanna run tests on',
        default: 'electron',
        choices: ['chrome', 'electron','chromium','firefox']
    },
    'spec': {
        alias: 's',
        describe: 'run test with specific feature files',
        default: 'cypress/integration/*.feature'
    },
    'videos':{
        trashAssetsBeforeRuns:true,
        video:false
    },
    'screenshots':
    {
        trashAssetsBeforeRuns:true
    }
}).help()
  .argv;

const reportDir = './cypress/results/json'
const reportFiles = `${reportDir}/*.json`

//console.log(__dirname)
//console.log(cypress.test)
//console.log(reportFiles)



// list all of existing report files
ls(reportFiles, { recurse: true }, file => console.log(`removing ${file.full}`));

// delete all existing report files
rm(reportFiles, (error) => {
    if (error) {
        console.error(`Error while removing existing report files: ${error}`);
        process.exit(1)
    }
    console.log('Removing all existing report files successfully!')
});

cypress.run({
    browser: argv.browser,
    spec: argv.spec,
    headless:true,
    record:false,
    exit:true,
    config:
    {
        screenshots:argv.screenshots,
        videos:argv.videos
    }
}).then((results) => {
    const reporterOptions = {
        reportDir: reportDir,
        quiet: true,
        overwrite: true,
        html: false,
        json: true,
        reportTitle: 'Framework Report',
        charts:true,
        files: [
            reportDir + '/*.json'
          ],
    };
    generateReport(reporterOptions)
}).catch((error) => {
    console.error('errors: ', error);
    process.exit(1)
});

function generateReport(options) {
    return merge(options).then((report) => {
        marge.create(report, options);
        process.exit(0)
    })
}
