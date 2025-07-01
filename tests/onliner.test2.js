const { Builder, By, until } = require('selenium-webdriver');
const { expect } = require('chai');

describe('Onliner Catalog Test', function() {
  this.timeout(20000);
  let driver;

  before(async () => {
    driver = await new Builder().forBrowser('chrome').build();
  });

  after(async () => {
    await driver.quit();
  });

  it('should open Catalog page', async () => {
    await driver.get('https://onliner.by');
    await driver.findElement(By.linkText('Каталог')).click();
    await driver.wait(until.urlContains('catalog'), 10000);
    expect(await driver.getCurrentUrl()).to.include('catalog');
  });
});
