module.exports = {
  src_folders: ['test/integration'],

  webdriver: {
    start_process: true,
    server_path: 'node_modules/.bin/chromedriver',
    port: 9515,
  },

  globals_path: 'test/integration/_globals.js',

  test_settings: {
    default: {
      launch_url: 'http://localhost:3001',
      desiredCapabilities: {
        browserName: 'chrome',
        chromeOptions: {
          args: ['headless'],
        },
      },
      screenshots: {
        enabled: true,
        on_failure: false,
        on_error: false,
        path: 'test/integration/screenshots',
      },
    },
  },

  test_runner: 'mocha',
};
