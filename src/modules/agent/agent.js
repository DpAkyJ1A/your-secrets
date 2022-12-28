import Control from "control";
import Card from "card";
import DeviceDetector from "device-detector-js";
import Compatibility from "../tools/compatibility/compatibility";

export default class Device extends Card {
  userAgent;

  constructor(container) {
    super(container, "User Agent");

    this.errorCatcher(this.fillCardData);
    this.fillPopupData();
  }

  fillCardData = () => {
    const deviceDetector = new DeviceDetector();
    this.userAgent = navigator.userAgent;
    const device = deviceDetector.parse(this.userAgent);

    const contentWrapper = new Control(this.card.node, "div", "content-wrapper");
    const osAndDeviceWrapper = new Control(contentWrapper.node, "div", "os-and-device-wrapper");

    // Device
    const [deviceType, deviceBrand, deviceModel] = [
      device.device.type,
      device.device.brand,
      device.device.model,
    ];

    const deviceContent = new Control(osAndDeviceWrapper.node, "div", "card__content");
    new Control(deviceContent.node, "h3", "card__text subheader", `Device`);
    new Control(deviceContent.node, "h4", "card__text", `Type: ${this.getHTML(deviceType)}`);
    new Control(deviceContent.node, "h4", "card__text", `Brand: ${this.getHTML(deviceBrand)}`);
    new Control(deviceContent.node, "h4", "card__text", `Model: ${this.getHTML(deviceModel)}`);

    // OS
    const [osName, osVersion, osPlatform] = [
      device.os.name,
      device.os.version,
      device.os.platform,
    ];

    const osContent = new Control(osAndDeviceWrapper.node, "div", "card__content");
    new Control(osContent.node, "h3", "card__text subheader", `OS`);
    new Control(osContent.node, "h4", "card__text", `Name: ${this.getHTML(osName)}`);
    new Control(osContent.node, "h4", "card__text", `Version: ${this.getHTML(osVersion)}`);
    new Control(osContent.node, "h4", "card__text", `Platform: ${this.getHTML(osPlatform)}`);

    // Client
    const [
      clientType,
      clientName,
      clientVersion,
      clientEngine,
      clientEngineVersion,
      clientURL,
    ] = [
      device.client.type,
      device.client.name,
      device.client.version,
      device.client.engine,
      device.client.engineVersion,
      device.client.url,
    ];

    const clientContent = new Control(contentWrapper.node, "div", "card__content");
    new Control(clientContent.node, "h3", "card__text subheader", `Client`);
    new Control(clientContent.node, "h4", "card__text", `Type: ${this.getHTML(clientType)}`);
    new Control(clientContent.node, "h4", "card__text", `Name: ${this.getHTML(clientName)}`);
    new Control(clientContent.node, "h4", "card__text", `Version: ${this.getHTML(clientVersion)}`);
    new Control(clientContent.node, "h4", "card__text", `Engine: ${this.getHTML(clientEngine)}`);
    new Control(clientContent.node, "h4", "card__text", `Engine Version: ${this.getHTML(clientEngineVersion)}`);
    new Control(clientContent.node, "h4", "card__text", `Client URL: ${this.getHTML(clientURL)}`);
  };

  getHTML = (data) => {
    let node = "";
    if (data) {
      node = `<span>${data}</span>`;
    } else {
      node = `<span class="card__error">—</span>`;
    }
    return node;
  }

  fillPopupData = () => {
    const descriptionWrapper = new Control(
      this.popup.popupContent.node,
      "div",
      "description-wrapper"
    );

    descriptionWrapper.node.innerHTML = `
      <p>The <strong><code class="${localStorage.getItem("theme")}">Navigator.userAgent</code></strong> read-only property returns the user agent string for the current browser.</p>
      <p>It returns for you:</p>
      <code class="${localStorage.getItem("theme")}">${this.userAgent}</code>
      <p>But for more human-readable output i use <a class="link" href="https://www.npmjs.com/package/device-detector-js">device-detector-js</a>. 
      This is a user agent parser which can detect the browser, operating system, device used (desktop, tablet, mobile, tv, cars, console, etc.), brand and model.
      Also device detector can identify a bot.
      </p>
    `;

    new Compatibility(this.popup.popupContent.node, "userAgent");
  };
}
