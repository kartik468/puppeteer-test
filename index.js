"use strict";

const puppeteer = require("puppeteer");

const URL =
  "https://www.google.com/search?q=movies&oq=movies&aqs=chrome..69i57j0i131i433i512l5j0i10i131i433j69i65.6439j0j7&sourceid=chrome&ie=UTF-8";

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(URL, {
    waitUntil: "networkidle2",
  });
  // page.pdf() is currently supported only in headless mode.
  // @see https://bugs.chromium.org/p/chromium/issues/detail?id=753118
  await page.pdf({
    path: "hn2.pdf",
    format: "letter",
    displayHeaderFooter: true,
    margin: 10,
    headerTemplate: '<span style="font-size: 10px"> <span class="pageNumber"></span>/<span class="totalPages"></span></span>',
    footerTemplate:
      '<span style="font-size: 30px; width: 50px; height: 50px; background-color: red; color:black; margin: 20px;">Footer</span>',
  });

  await browser.close();
})();
