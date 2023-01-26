"use strict";

const puppeteer = require("puppeteer");

const URL =
  "https://www.google.com/search?q=movies&oq=movies&aqs=chrome..69i57j0i131i433i512l5j0i10i131i433j69i65.6439j0j7&sourceid=chrome&ie=UTF-8";

(async () => {
  //   const browser = await puppeteer.launch();
  //   const page = await browser.newPage();
  //   await page.goto(URL, {
  //     waitUntil: "networkidle2",
  //   });

  const header = `<header style="margin: auto; width: 40%">
            <img style="float: left; marginRight: 8px; marginLeft: 36px; width: 25%" src="data:image/jpeg;base64,/9j/4AAQSkZJRgAB...09Yv//Z" alt="Pivohub" />
            <p style="font-family: arial; float: right; width: 55%; color: red; margin-top: 24px; font-size: 10px">
                <b>My header</b>
            </p>
        </header>`;
  const footer = `<footer style="margin: auto; width: 40%">
            <img style="float: left; marginRight: 8px; marginLeft: 36px; width: 25%" src="data:image/jpeg;base64,/9j/4AAQSkZJRgAB...09Yv//Z" alt="Pivohub" />
            <p style="font-family: arial; float: right; width: 55%; color: red; margin-top: 24px; font-size: 10px">
                <b>My footer</b>
            </p>
        </footer>`;

  const content = `<!DOCTYPE html>
        <html>
            <head>
                <meta charSet="utf-8"/>
                <style type="text/css">
                    body { backgroundColor: "red" }
                </style>
            </head>
            <body>
                <h1>Hello</h1>
            </body>
        </html>`;

  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setContent(content, { waitUntil: "networkidle0" });
  const buffer = await page.pdf({
    path: 'abc1.pdf',
    format: "A4",
    displayHeaderFooter: true,
    headerTemplate: header,
    footerTemplate: footer,
    margin: { top: "100px", bottom: "200px" },
    printBackground: true,
  });
})();
