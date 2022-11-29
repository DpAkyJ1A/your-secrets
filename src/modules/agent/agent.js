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

    const content = new Control(this.card.node, "div", "card__content");
    // Device
    const [deviceType, deviceBrand, deviceModel] = [
      device.device.type,
      device.device.brand,
      device.device.model,
    ];

    new Control(content.node, "h3", "card__text subheader", `Device`);

    new Control(content.node, "h4", "card__text", `Type: ${this.getHTML(deviceType)}`);
    new Control(content.node, "h4", "card__text", `Brand: ${this.getHTML(deviceBrand)}`);
    new Control(content.node, "h4", "card__text", `Model: ${this.getHTML(deviceModel)}`);

    // OS
    const [osName, osVersion, osPlatform] = [
      device.os.name,
      device.os.version,
      device.os.platform,
    ];

    new Control(content.node, "h3", "card__text subheader", `OS`);

    new Control(content.node, "h4", "card__text", `Name: ${this.getHTML(osName)}`);
    new Control(content.node, "h4", "card__text", `Version: ${this.getHTML(osVersion)}`);
    new Control(content.node, "h4", "card__text", `Platform: ${this.getHTML(osPlatform)}`);

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

    new Control(content.node, "h3", "card__text subheader", `Client`);
    new Control(content.node, "h4", "card__text", `Type: ${this.getHTML(clientType)}`);
    new Control(content.node, "h4", "card__text", `Name: ${this.getHTML(clientName)}`);
    new Control(content.node, "h4", "card__text", `Version: ${this.getHTML(clientVersion)}`);
    new Control(content.node, "h4", "card__text", `Engine: ${this.getHTML(clientEngine)}`);
    new Control(content.node, "h4", "card__text", `Engine Version: ${this.getHTML(clientEngineVersion)}`);
    new Control(content.node, "h4", "card__text", `Client URL: ${this.getHTML(clientURL)}`);

    // Bot
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
      <p>But for more human-readable output i use <a class="link" href="https://www.npmjs.com/package/device-detector-js">device-detector-js</a>.</p>
    `;

    new Compatibility(this.popup.popupContent.node, "userAgent");
  };
}
