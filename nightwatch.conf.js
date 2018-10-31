module.exports = {
  test_workers: {
    enabled: true,
    workers: 'auto'
  },
  src_folders: ['tests/e2e/specs'],
  output_folder: 'tests/e2e/reports',
  custom_commands_path: '',
  custom_assertions_path: '',
  page_objects_path: '',
  // load global setting
  globals_path: 'tests/e2e/global.js',

  selenium: {
    // chromedriver
    start_process: false,
    // Selenium server use chromedrive
    start_process: true,
    server_path: require('selenium-server').path,
    log_path: 'log/',
    port: 4444,
    cli_args: {
      'webdriver.chrome.driver': require('chromedriver').path
    }
  },

  test_settings: {
    default: {
      launch_url: 'http://localhost',
      // chromedriver
      selenium_port: 9515,
      // Selenium server use chromedrive
      // selenium_port: 4444,
      default_path_prefix: '',
      selenium_host: 'localhost',
      silent: true,
      screenshots: {
        enabled: true,
        path: 'tests/e2e/screenshots'
      },
      desiredCapabilities: {
        browserName: 'chrome',
        chromeOptions: {
          args: ['--no-sandbox']
        },
        javascriptEnabled: true,
        acceptSslCerts: true
      }
    }
  }
};
