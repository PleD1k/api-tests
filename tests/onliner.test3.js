const { Builder, By, until } = require('selenium-webdriver');
const { expect } = require('chai');

describe('Shopping cart icon check', function() {
  this.timeout(20000);
  let driver;

  before(async () => {
    driver = await new Builder().forBrowser('chrome').build();
  });

  after(async () => {
    await driver.quit();
  });

  it('should display shopping cart icon', async () => {
    await driver.get('https://www.onliner.by');
    const cartIcon = await driver.wait(until.elementLocated(By.css('.auth-bar__item--cart')), 10000);
    expect(await cartIcon.isDisplayed()).to.be.true;
  });
});
