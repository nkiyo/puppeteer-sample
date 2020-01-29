const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://google.com');
  // TODO ネット繋がってない場合は検出したい
  // TODO タイムアウトを短くする 30sec は長い

  // 検索窓にキーワードを入力する
  // xpath で選択した部品に文字入力
  const searchInputs = await page.$x('//*[@id="tsf"]/div[2]/div[1]/div[1]/div/div[2]/input');
  await searchInputs[0].type('puppeteer');

  // 検索ボタンを押下する
  // xpath で選択した部品をクリック
  const searchButtons = await page.$x('//*[@id="tsf"]/div[2]/div[1]/div[3]/center/input[1]');
  await searchButtons[0].click();
  await page.waitForNavigation();

  // TODO 検索結果一覧を取得して出力
  const searchResults = await page.$x('//*[@id="rso"]/div[1]/div/div/div/div/div[1]/a/h3')
  console.log(`${searchResults.length}`);
  for(const result of searchResults) {
    console.log(`${result.innerText}`);
  }

  await page.screenshot({path: 'example.png'});
  await page.pdf({path: 'example.pdf', format: 'A4'});

  await browser.close();
})();
