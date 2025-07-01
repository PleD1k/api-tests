const { Builder, By } = require('selenium-webdriver');
const { expect } = require('chai');

describe('Button text check', function() {
  this.timeout(20000);
  let driver;

  before(async () => {
    driver = await new Builder().forBrowser('chrome').build();
  });

  after(async () => {
    await driver.quit();
  });

  it('should check login button text', async () => {
    await driver.get('https://onliner.by');
    const loginButton = await driver.findElement(By.xpath("//div[contains(@class,'auth-bar__item--text')]"));
    expect(await loginButton.getText()).to.include('Вход');
  });
});
