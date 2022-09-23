import Control from "control";
import Card from "card";
import DeviceDetector from "device-detector-js";

export default class Device extends Card {
  constructor(container) {
    super(container, "Device");

    const content = new Control(this.card.node, 'div', 'card__content');

    const deviceDetector = new DeviceDetector();
    const userAgent = navigator.userAgent;
    const device = deviceDetector.parse(userAgent);

    console.log(device);

    const deviceType = new Control(
      content.node,
      "h3",
      "card__text",
      `Type: ${device.device.type}`
    );
    const os = new Control(
      content.node,
      "h3",
      "card__text",
      `OS: ${device.os.name} ${device.os.version}`
    );
        const platform = new Control(
          content.node,
          "h3",
          "card__text",
          `Platform: ${device.os.platform}`
        );
    const os2 = new Control(
      content.node,
      "h3",
      "card__text",
      `Browser: ${device.client.name} ${device.client.version}`
    );

  }
}
