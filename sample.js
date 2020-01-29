const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://google.com');
  // TODO ネット繋がってない場合は検出したい

  // 検索窓にキーワードを入力する
  // xpath で選択した部品に文字入力
  const searchInputs = await page.$x('//*[@id="tsf"]/div[2]/div[1]/div[1]/div/div[2]/input');
  await searchInputs[0].type('1234');

  // 検索ボタンを押下する
  // xpath で選択した部品をクリック
  const searchButtons = await page.$x('//*[@id="tsf"]/div[2]/div[1]/div[3]/center/input[1]');
  await searchButtons[0].click();
  await page.waitForNavigation();

  await page.screenshot({path: 'example.png'});
  await page.pdf({path: 'example.pdf', format: 'A4'});

  await browser.close();
})();
