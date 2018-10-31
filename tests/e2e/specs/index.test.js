const $$ = require('../constant');

module.exports = {
  'Demo test': function(browser) {
    browser
      .url('http://localhost:8080')
      .waitForElementVisible('body', 5000)
      .saveScreenshot(`${$$.screenshots.path}/index.png`)
      .end();
  }
};
