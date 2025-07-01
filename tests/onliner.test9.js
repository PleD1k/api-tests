const { Builder, By, until } = require('selenium-webdriver');

describe('Select item from category', function() {
  this.timeout(15000);
  let driver;

  before(async () => {
    driver = await new Builder().forBrowser('chrome').build();
  });

  after(async () => {
    await driver.quit();
  });

  it('should navigate to catalog and click first link', async () => {
    await driver.get('https://www.onliner.by');

    const categoryLink = await driver.wait(
      until.elementLocated(By.xpath("//span[@class='b-main-navigation__text' and text()='Каталог']")),
      5000
    );
    await categoryLink.click();

    const product = await driver.wait(
      until.elementLocated(By.xpath("(//a[contains(@class, 'catalog-form__popular-item')])[2]")),
      5000
    );
    await driver.executeScript('arguments[0].scrollIntoView(true);', product);
    await product.click();

    const selectItem = await driver.wait(
      until.elementLocated(By.xpath("(//a[contains(@class, 'catalog-form__link_primary-additional')])[1]")),
      5000
    );
    await driver.executeScript('arguments[0].scrollIntoView(true);', selectItem);
    await selectItem.click();
  });
});
