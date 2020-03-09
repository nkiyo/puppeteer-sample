// abehiroshiのHPを開き、プロフィールリンクを押下するサンプル

const puppeteer = require('puppeteer');
const util = require('util');

(async () => {
  const browser = await puppeteer.launch({
    //headless: false,
    //devtools: true
  });

  const page = await browser.newPage();
  await page.goto('http://abehiroshi.la.coocan.jp/');
  let topFrame = await page.frames()[2];

  const [profieLink] = await topFrame.$x('/html/body/table/tbody/tr[1]/td[1]/table/tbody/tr[4]/td[2]/a');
  await profieLink.click();

  // プロフィールをスクレイピングする
  topFrame = await page.frames()[2];
  const txts = await topFrame.evaluate(() => {
    const elems = document.querySelectorAll('table tbody tr td');
    const tds = Array.from(elems);
    return tds.map(td => td.textContent.replace(/[\n\r]+/g, ''));
  });
  console.log(`${txts.join(',')}`);

  await page.screenshot({path: 'example.png'});
  await page.pdf({path: 'example.pdf', format: 'A4'});

  await browser.close();
})();
