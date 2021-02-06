/*const headless = require('puppeteer');
const url ="https://www.bookdepository.com/JavaScript-Everywhere-Adam-D-Scott/9781492046981"; */

/*const filePath = "C:/Irenej/page.png";*/

/*
let date = new Date();
let today = date.toLocaleDateString();

async function Headless (url) {
  const browser = await headless.launch();
  const page = await browser.newPage();
  await page.goto(url, {waitUntil: 'networkidle2'});
  const currentPrice = await page.evaluate(() => document.querySelector('span.sale-price').textContent);
  const bookTitle = await page.evaluate(() => document.querySelector('h1').textContent);
  console.log(`${bookTitle} : ${currentPrice}`);
  await browser.close();
}; 

Headless(url);

*/