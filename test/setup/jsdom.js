let jsdomCleanup = null
beforeAll(() => (jsdomCleanup = require('jsdom-global')()))
afterAll(() => jsdomCleanup())
