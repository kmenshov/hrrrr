let i = 0;

describe('General tests to see if Nightwatch is working', function() {
  it.skip('saves a screenshot', function(browser) {
    browser
      .init()
      .saveScreenshot(`${browser.options.screenshots.path}/scr_${Date.now()}_${i += 1}.png`)
      .end();
  });

  it('checks that a new text appears on the page after 2 seconds', function(browser) {
    browser
      .init()
      .expect.element('div.report').to.not.be.present;

    browser
      .pause(2500) // with some margin
      .expect.element('div.report').to.be.present;

    browser
      .expect.element('div.report').text.to.equal('{"code":200,"message":"OK: 2-seconds-after-page-load"}');

    browser.end();
  });

  it('interacts with a page', function(browser) {
    browser.init().expect.element('div.report').to.not.be.present;

    browser.click('button').pause(2500).click('button');

    browser.expect.element('div.report:nth-of-type(1)').text.to.equal('{"code":200,"message":"OK: on-button-click"}');
    browser.expect.element('div.report:nth-of-type(2)').text.to.equal('{"code":200,"message":"OK: 2-seconds-after-page-load"}');
    browser.expect.element('div.report:nth-of-type(3)').text.to.equal('{"code":200,"message":"OK: on-button-click"}');

    browser.end();
  });
});
