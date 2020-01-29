const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://google.com');

  // xpath で選択した部品に文字入力
  const searchInputs = await page.$x('//*[@id="tsf"]/div[2]/div[1]/div[1]/div/div[2]/input');
  await searchInputs[0].type('1234');

  // TODO xpath で選択した部品をクリック

  await page.screenshot({path: 'example.png'});
  await page.pdf({path: 'example.pdf', format: 'A4'});

  await browser.close();
})();
