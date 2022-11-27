import Control from "control";
const bcd = require("@mdn/browser-compat-data");

export default class CompatibilityTable {
  mdn_url;
  constructor(node, obj) {
    const data = bcd.api.Navigator[obj].__compat;
    console.log(data.mdn_url.replace("ru", "en-US"))
    this.mdn_url = data.mdn_url.replace("org/", "org/en-US/");
    const support = data.support;

    console.log(bcd.api.Navigator);

    const tablesWrapper = new Control(node, "div", "tables-wrapper");

    this.desktopBrowsersTableCreate(tablesWrapper.node, support);
    this.mobileBrowsersTableCreate(tablesWrapper.node, support);
  }

  desktopBrowsersTableCreate = (node, support) => {
    const table = new Control(node, "table", "compatibility-table");

    const thead = new Control(table.node, "thead", "compatibility-table-head");

    const platforms = new Control(thead.node, "tr");
    const desktop = new Control(platforms.node, "th", "", "Desktop");
    desktop.node.setAttribute("colspan", "5");

    const browsers = new Control(thead.node, "tr");
    // desktop browsers
    const chrome = new Control(browsers.node, "th", "", "Chrome");
    const edge = new Control(browsers.node, "th", "", "Edge");
    const safari = new Control(browsers.node, "th", "", "Safari");
    const firefox = new Control(browsers.node, "th", "", "Firefox");
    const opera = new Control(browsers.node, "th", "", "Opera");

    const tbody = new Control(table.node, "tbody", "compatibility-table-body");

    const versions = new Control(tbody.node, "tr");
    // chrome
    this.versionsTdCreate(versions.node, support.chrome);
    // edge
    this.versionsTdCreate(versions.node, support.edge);
    // safari
    this.versionsTdCreate(versions.node, support.safari);
    // firefox
    this.versionsTdCreate(versions.node, support.firefox);
    // opera
    this.versionsTdCreate(versions.node, support.opera);
  };

  mobileBrowsersTableCreate = (node, support) => {
    const table = new Control(node, "table", "compatibility-table");

    const thead = new Control(table.node, "thead", "compatibility-table-head");
    const platforms = new Control(thead.node, "tr");

    const mobile = new Control(platforms.node, "th", "", "Mobile");
    mobile.node.setAttribute("colspan", "6");

    const browsers = new Control(thead.node, "tr");
    // mobile browsers
    new Control(browsers.node, "th", "", "Chrome for Android");
    new Control(browsers.node, "th", "", "Firefox for Android");
    new Control(browsers.node, "th", "", "Opera for Android");
    new Control(browsers.node, "th", "", "Safari on IOS");
    new Control(browsers.node, "th", "", "Samsung Internet");
    new Control(browsers.node, "th", "", "WebView Android");

    const tbody = new Control(table.node, "tbody", "compatibility-table-body");

    const versions = new Control(tbody.node, "tr");
    // chromeForAndroid
    this.versionsTdCreate(versions.node, support.chrome_android);
    // firefoxForAndroid
    this.versionsTdCreate(versions.node, support.firefox_android);
    // operaForAndroid
    this.versionsTdCreate(versions.node, support.opera_android);
    // safariOnIos
    this.versionsTdCreate(versions.node, support.safari_ios);
    // samsungInternet
    this.versionsTdCreate(versions.node, support.samsunginternet_android);
    // webViewAndroid
    this.versionsTdCreate(versions.node, support.webview_android);
  };

  versionsTdCreate = (node, data) => {
    if (data.version_removed) {
      new Control(
        node,
        "td",
        "not-supported",
        `${data.version_added} - ${data.version_removed}`
      );
    } else if (data.version_added) {
      new Control(node, "td", "supported", `${data.version_added}`);
    } else {
      new Control(node, "td", "not-supported", `-`);
    }
  };
}
