const { Builder, By } = require('selenium-webdriver');
const { expect } = require('chai');

describe('Header logo visibility', function() {
  this.timeout(20000);
  let driver;

  before(async () => {
    driver = await new Builder().forBrowser('chrome').build();
  });

  after(async () => {
    await driver.quit();
  });

  it('should show the Onliner logo', async () => {
    await driver.get('https://onliner.by');
    const logo = await driver.findElement(By.className('onliner_logo'));
    expect(await logo.isDisplayed()).to.be.true;
  });
});
