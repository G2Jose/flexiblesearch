const p = require("puppeteer");

let USERNAME = "";
let PASSWORD = "";
let URL = "";

const _login = async (page, username = "admin", password = "nimda") => {
  await page.focus("input[name=j_password]");
  page.type(password);
  await page.click("button[type=submit]");
};

const _openFlexibleSearch = async page => {
  await page.waitFor("#console");
  await page.click("#console");
  await page.click("[data-menuitem=flexiblesearch]");
};

const _query = async (page, query) => {
  await page.waitForNavigation({ waitUntil: "load" });
  await page.click(".CodeMirror-scroll");
  page.type(query);
  // page.click(".buttonSubmit", { button: "left" });
  await page.waitFor(1000); // Not sure why this is required
  const submitButton = await page.$(".buttonSubmit");
  await submitButton.click({ clickCount: 10 });
  await page.waitFor("table");
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
};

const query = async querytxt => {
  const browser = await p.launch({
    headless: false,
    ignoreHTTPSErrors: true
  });
  const page = await browser.newPage();
  page.setViewport({ width: 1000, height: 1000 });
  await page.goto(URL, {
    waituntil: "networkidle"
  });
  await _login(page);
  await _openFlexibleSearch(page);
  const rows = await _query(page, querytxt);
  return rows;
};

const initialize = (options = {}) => {
  const { username, password, url } = options;
  USERNAME = username || "admin";
  PASSWORD = password || "nimda";
  URL = url || "https://localhost:9002/admin";
};

exports.query = query;
exports.initialize = initialize;
