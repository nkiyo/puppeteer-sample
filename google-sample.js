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

  // 検索結果一覧を取得して出力
  // xpathで選択した部品のinnerTextを出力
  // => https://qiita.com/horikeso/items/f4af232c31ac1d81a425
  const searchResults = await page.$x('//div/div/div/div/a/h3');
  for(let index = 0; index < searchResults.length; index++) {
    const value = await (await searchResults[index].getProperty('innerText')).jsonValue();
    console.log(`${value}`);
  }

  // デバッグ用 ページ全体を出力
  // => https://github.com/puppeteer/puppeteer/issues/331#issuecomment-323010213
  //const bodyHTML = await page.evaluate(() => document.body.innerHTML);
  //console.log(`${bodyHTML}`);

  await page.screenshot({path: 'example.png'});
  await page.pdf({path: 'example.pdf', format: 'A4'});

  await browser.close();
})();
