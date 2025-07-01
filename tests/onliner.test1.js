const { Builder, By } = require('selenium-webdriver');
const { expect } = require('chai');

describe('Onliner Title Test', function() {
  this.timeout(20000);

  let driver;

  before(async () => {
    driver = await new Builder().forBrowser('chrome').build();
  });

  after(async () => {
    await driver.quit();
  });

  it('should page have title', async () => {
    await driver.get('https://onliner.by');
    expect(await driver.getTitle()).to.include('Onlíner');
  });
});
