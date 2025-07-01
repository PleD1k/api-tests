const { Builder, By } = require('selenium-webdriver');
const { expect } = require('chai');

describe('Check News menu item', function() {
  this.timeout(20000);
  let driver;

  before(async () => {
    driver = await new Builder().forBrowser('chrome').build();
  });

  after(async () => {
    await driver.quit();
  });

  it('should have News menu item', async () => {
    await driver.get('https://onliner.by');
    const newsMenu = await driver.findElement(By.xpath("//span[@class='b-main-navigation__text' and text()='Новости']"));
    expect(await newsMenu.isDisplayed()).to.be.true;
  });
});
