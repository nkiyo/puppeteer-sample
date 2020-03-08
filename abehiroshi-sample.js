// abehiroshiのHPを開き、プロフィールリンクを押下するサンプル

const puppeteer = require('puppeteer');
const util = require('util');

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    devtools: true
  });

  const page = await browser.newPage();
  await page.goto('http://abehiroshi.la.coocan.jp/');
  let topFrame = await page.frames()[2];

  const [profieLink] = await topFrame.$x('/html/body/table/tbody/tr[1]/td[1]/table/tbody/tr[4]/td[2]/a');
  await profieLink.click();

  // TODO プロフィールをスクレイピングする
  topFrame = await page.frames()[2];
  const [col1, col2] = await topFrame.$x('/html/body/table/tbody/tr[2]/td');
  util.inspect(col1);
  util.inspect(col2);

  // デバッグ用 ページ全体を出力
  // => https://github.com/puppeteer/puppeteer/issues/331#issuecomment-323010213
  //const bodyHTML = await page.evaluate(() => document.body.innerHTML);
  //console.log(`${bodyHTML}`);

  await page.screenshot({path: 'example.png'});
  await page.pdf({path: 'example.pdf', format: 'A4'});

  await browser.close();
})();
