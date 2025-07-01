const { Builder, By, until } = require('selenium-webdriver');
const { expect } = require('chai');

describe('Footer links check', function() {
  this.timeout(20000);
  let driver;

  before(async () => {
    driver = await new Builder().forBrowser('chrome').build();
  });

  after(async () => {
    await driver.quit();
  });

  it('should have footer link with text "О проекте"', async () => {
    await driver.get('https://www.onliner.by');
    const footerLink = await driver.wait(until.elementLocated(By.xpath("//a[contains(text(),'О компании')]")), 10000);
    expect(await footerLink.getText()).to.equal('О компании');
  });
});
