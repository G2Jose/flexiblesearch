const p = require("puppeteer");

let USERNAME, PASSWORD, URL, HEADLESS;

const query = async querytxt => {
  // Launch browser, go to page, set viewport
  const browser = await p.launch({
    headless: HEADLESS,
    ignoreHTTPSErrors: true
  });
  const page = await browser.newPage();
  page.setViewport({ width: 1000, height: 1000 });
  await page.goto(URL, {
    waituntil: "networkidle"
  });

  // Type in credentials
  await (async () => {
    await page.focus("input[name=j_password]");
    page.type(PASSWORD);
    await page.click("button[type=submit]");
  })();

  // Go to flexible search console
  await (async () => {
    await page.waitFor("#console");
    await page.click("#console");
    await page.click("[data-menuitem=flexiblesearch]");
  })();

  // Type flexiblesearch query, hit submit, go to results, read table, return rows
  const rows = await (async () => {
    await page.waitForNavigation({ waitUntil: "load" });
    await page.click(".CodeMirror-scroll");
    page.type(querytxt);
    await page.waitFor(1000);
    const submitButton = await page.$(".buttonSubmit");
    await submitButton.click({ clickCount: 10 });
    await page.waitFor("table");

    // Run this in browser context, return rows to node context
    const rows = await page.evaluate(() => {
      const _rows = Array.from(document.querySelectorAll("tr"));
      const keys = Array.from(_rows[0].querySelectorAll("th")).map(
        item => item.textContent
      );

      const _rowsWithCols = _rows.filter((_, index) => index !== 0).map(row => {
        return Array.from(row.querySelectorAll("td")).map(
          item => item.textContent
        );
      });

      return _rowsWithCols.map(_row => {
        let obj = {};
        keys.forEach((key, index) => {
          obj[key] = _row[index];
        });
        return obj;
      });
    });
    return rows;
  })();
  return rows;
};

const initialize = (options = {}) => {
  const { username, password, url, showBrowser } = options;
  USERNAME = username || "admin";
  PASSWORD = password || "nimda";
  URL = url || "https://localhost:9002/admin";
  HEADLESS = !showBrowser;
};

exports.query = query;
exports.initialize = initialize;
