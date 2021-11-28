module.exports = {
    //"preset": "jest-puppeteer"
    //preset: 'jest-puppeteer-preset',
    globalSetup: './setup.js',
    globalTeardown: './teardown.js',
    testEnvironment: './puppeteer_environment.js',
    testTimeout: 60000
}