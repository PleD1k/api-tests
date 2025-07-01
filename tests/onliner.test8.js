const { Builder, By } = require('selenium-webdriver');
const { expect } = require('chai');

describe('Search field exists', function() {
  this.timeout(20000);
  let driver;

  before(async () => {
    driver = await new Builder().forBrowser('chrome').build();
  });

  after(async () => {
    await driver.quit();
  });

  it('should have search input field', async () => {
    await driver.get('https://onliner.by');
    const searchInput = await driver.findElement(By.css('input.fast-search__input'));
    expect(await searchInput.isDisplayed()).to.be.true;
  });
});
