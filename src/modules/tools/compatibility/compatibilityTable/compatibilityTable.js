import Control from "control";
import bcd from "@mdn/browser-compat-data";

export default class CompatibilityTable {
  data;
  mdn_url;
  support;
  constructor(node, obj) {
    let propsNames;

    if (bcd.api.Navigator.hasOwnProperty(obj)) {
      this.data = bcd.api.Navigator[obj].__compat;
      this.mdn_url = this.data.mdn_url.replace("org/", "org/en-US/");
      this.support = [this.data.support];
      propsNames = [obj];
    } else if (bcd.api.hasOwnProperty(obj)) {
      this.data = bcd.api[obj];
      this.mdn_url = this.data.__compat.mdn_url.replace("org/", "org/en-US/");
      propsNames = Object.keys(this.data).filter((name) => name !== "__compat");
      this.support = propsNames.map((name) => this.data[name].__compat.support);
    } else {
      this.data = null;
    }

    const wrapper = new Control(node, "div", "wrapper");
    const name = new Control(wrapper.node, "h3", "", obj);
    const slider = new Control(wrapper.node, "div", "slider");
    const tablesWrapper = new Control(slider.node, "div", "tables-wrapper");
    const desktopTableWrapper = new Control(tablesWrapper.node, "div", "table-wrapper");
    this.desktopBrowsersTableCreate(desktopTableWrapper.node, this.support, propsNames);
    const mobileTableWrapper = new Control(tablesWrapper.node, "div", "table-wrapper");
    this.mobileBrowsersTableCreate(mobileTableWrapper.node, this.support, propsNames);

    this.controlArrowsCreate(slider.node, tablesWrapper.node);

    if (!Array.isArray(this.data) && this.data) {
      // console.log(bcd.api.Navigator);
      // console.log(bcd.api);
    }
  }

  desktopBrowsersTableCreate = (node, support, keys) => {
    const table = new Control(node, "table", "compatibility-table");

    const thead = new Control(table.node, "thead", "compatibility-table-head");
    const platforms = new Control(thead.node, "tr");

    const emptyCell = new Control(platforms.node, "th", "", ""); // empty cell
    emptyCell.node.setAttribute("rowspan", "2");

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
    
    keys.map((key, i) => {
      const versions = new Control(tbody.node, "tr");
      const name = new Control(versions.node, "th", "row-name", `${key}`);
      // chrome
      this.versionsTdCreate(versions.node, support[i].chrome);
      // edge
      this.versionsTdCreate(versions.node, support[i].edge);
      // safari
      this.versionsTdCreate(versions.node, support[i].safari);
      // firefox
      this.versionsTdCreate(versions.node, support[i].firefox);
      // opera
      this.versionsTdCreate(versions.node, support[i].opera);
    });
  };

  mobileBrowsersTableCreate = (node, support, keys) => {
    const table = new Control(node, "table", "compatibility-table");

    const thead = new Control(table.node, "thead", "compatibility-table-head");
    const platforms = new Control(thead.node, "tr");

    const emptyCell = new Control(platforms.node, "th", "", ""); // empty cell
    emptyCell.node.setAttribute("rowspan", "2");
    
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

    keys.map((key, i) => {
      const versions = new Control(tbody.node, "tr");
      const name = new Control(versions.node, "th", "row-name", `${key}`);
      // chromeForAndroid
      this.versionsTdCreate(versions.node, support[i].chrome_android);
      // firefoxForAndroid
      this.versionsTdCreate(versions.node, support[i].firefox_android);
      // operaForAndroid
      this.versionsTdCreate(versions.node, support[i].opera_android);
      // safariOnIos
      this.versionsTdCreate(versions.node, support[i].safari_ios);
      // samsungInternet
      this.versionsTdCreate(versions.node, support[i].samsunginternet_android);
      // webViewAndroid
      this.versionsTdCreate(versions.node, support[i].webview_android);
    });
  };;

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

  controlArrowsCreate = (node, tablesWrapper) => {
    const rightArrow = new Control(node, "ion-icon", "right-arrow");
    rightArrow.node.setAttribute("name", "chevron-forward-outline");
    const leftArrow = new Control(node, "ion-icon", "left-arrow disabled");
    leftArrow.node.setAttribute("name", "chevron-back-outline");

    rightArrow.node.onclick = () => {
      disabledToggle();
      tablesWrapper.style.marginLeft = "-966px";
    };
    
    leftArrow.node.onclick = () => {
      disabledToggle();
      tablesWrapper.style.marginLeft = "0";
    };

    const disabledToggle = () => {
      rightArrow.node.classList.toggle("disabled");
      leftArrow.node.classList.toggle("disabled");
    }
  }
}
