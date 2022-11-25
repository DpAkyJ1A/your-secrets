import Control from "control";
import Card from "card";
import DeviceDetector from "device-detector-js";
import CompatibilityTable from "../tools/compatibilityTable/compatibilityTable";

export default class Device extends Card {
  constructor(container) {
    super(container, "User Agent");

    this.errorCatcher(this.fillCardData);
    this.fillPopupData();
  }

  fillCardData = () => {
    const deviceDetector = new DeviceDetector();
    const userAgent = navigator.userAgent;
    const device = deviceDetector.parse(userAgent);

    const content = new Control(this.card.node, "div", "card__content");
    // Device
    const [deviceType, deviceBrand, deviceModel] = [
      device.device.type,
      device.device.brand,
      device.device.model,
    ];
    if (deviceType || deviceBrand || deviceModel) {
      new Control(content.node, "h3", "card__text", `----- Device -----`);
    }
    if (deviceType) {
      new Control(content.node, "h3", "card__text", `Type: ${deviceType}`);
    }
    if (deviceBrand) {
      new Control(content.node, "h3", "card__text", `Brand: ${deviceBrand}`);
    }
    if (deviceModel) {
      new Control(content.node, "h3", "card__text", `Model: ${deviceModel}`);
    }

    // OS
    const [osName, osVersion, osPlatform] = [
      device.os.name,
      device.os.version,
      device.os.platform,
    ];
    if (osName || osVersion || osPlatform) {
      new Control(content.node, "h3", "card__text", `----- OS -----`);
    }
    if (osName) {
      new Control(content.node, "h3", "card__text", `Name: ${osName}`);
    }
    if (osVersion) {
      new Control(content.node, "h3", "card__text", `Version: ${osVersion}`);
    }
    if (osPlatform) {
      new Control(content.node, "h3", "card__text", `Platform: ${osPlatform}`);
    }

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
    if (
      clientType ||
      clientName ||
      clientVersion ||
      clientEngine ||
      clientEngineVersion ||
      clientURL
    ) {
      new Control(content.node, "h3", "card__text", `----- Client -----`);
    }
    if (clientType) {
      new Control(content.node, "h3", "card__text", `Type: ${clientType}`);
    }
    if (clientName) {
      new Control(content.node, "h3", "card__text", `Name: ${clientName}`);
    }
    if (clientVersion) {
      new Control(
        content.node,
        "h3",
        "card__text",
        `Version: ${clientVersion}`
      );
    }
    if (clientEngine) {
      new Control(content.node, "h3", "card__text", `Engine: ${clientEngine}`);
    }
    if (clientEngineVersion) {
      new Control(
        content.node,
        "h3",
        "card__text",
        `Engine Version: ${clientEngineVersion}`
      );
    }
    if (clientURL) {
      new Control(content.node, "h3", "card__text", `URL: ${clientURL}`);
    }

    // Bot
    if (device.bot) {
      const [botCategory, botName, botProducer, botUrl] = [
        device.bot.category,
        device.bot.name,
        device.bot.producer,
        device.bot.url,
      ];
      if (botCategory || botName || botProducer || botUrl) {
        new Control(content.node, "h3", "card__text", `----- Bot -----`);
      }
      if (botCategory) {
        new Control(
          content.node,
          "h3",
          "card__text",
          `Category: ${botCategory}`
        );
      }
      if (botName) {
        new Control(content.node, "h3", "card__text", `Name: ${botName}`);
      }
      if (botProducer) {
        new Control(
          content.node,
          "h3",
          "card__text",
          `Producer: ${botProducer}`
        );
      }
      if (botUrl) {
        new Control(content.node, "h3", "card__text", `URL: ${botUrl}`);
      }
    }
  };

  fillPopupData = () => {
    new CompatibilityTable(this.popup.popupContent.node, "userAgent");
  }
}
