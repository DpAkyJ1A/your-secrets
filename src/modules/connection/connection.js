import Control from "control";
import Card from "card";
import { getHTML, getBooleanIcon } from "decoratingFunctions";

export default class Connection extends Card {
  constructor(container) {
    super(container, "Connection");

    this.errorCatcher(this.fillCardData);
    this.fillPopupData();
  }

  fillCardData = () => {
    const connection = (
      navigator.connection ||
      navigator.mozConnection ||
      navigator.webkitConnection
    );

    const content = new Control(this.card.node, "div", "card__content");

    const isOnline = new Control(
      content.node,
      "h4",
      "card__text",
      `Online: ${getBooleanIcon(navigator.onLine)}`
    );

    const type = new Control(
      content.node,
      "h4",
      "card__text",
      `Type: ${connection ? getHTML(connection.effectiveType) : getHTML(undefined)}`
    );

    const bandwidthEstimate = new Control(
      content.node,
      "h4",
      "card__text",
      `Bandwidth estimate: ${
        connection ? getHTML(connection.downlink) : getHTML(undefined)
      } Mbps`
    );

    const roundTripTime = new Control(
      content.node,
      "h4",
      "card__text",
      `Round Trip Time (delay): ${
        connection ? getHTML(connection.rtt) : getHTML(undefined)
      } ms`
    );

    const trafficSaving = new Control(
      content.node,
      "h4",
      "card__text",
      `Traffic saving: ${
        connection ? getBooleanIcon(connection.saveData) : getHTML(undefined)
      }`
    );

    function updateConnectionStatus() {
      isOnline.node.innerHTML = `Online: ${getBooleanIcon(navigator.onLine)}`;
      type.node.innerHTML = `Type: ${getHTML(connection.effectiveType)}`;
      bandwidthEstimate.node.innerHTML = `Bandwidth estimate: ${getHTML(connection.downlink)} Mbps`;
      roundTripTime.node.innerHTML = `Round Trip Time (delay): ${getHTML(connection.rtt)} ms`;
      trafficSaving.node.innerHTML = `Traffic saving: ${getBooleanIcon(connection.saveData)}`;
    }

    connection && connection.addEventListener("change", updateConnectionStatus);
  };

  fillPopupData = () => {
    const description = `<p>The <strong><code class="${localStorage.getItem(
      "theme"
    )}">NetworkInformation</code></strong> interface of the <a class="link" href="https://developer.mozilla.org/en-US/docs/Web/API/Network_Information_API">Network Information API</a> provides information about the connection a device is using to communicate with the network and provides a means for scripts to be notified if the connection type changes.</p>
    <p>The connection object is useful for deciding whether to preload resources that take large amounts of bandwidth or memory.</p>
    `;

    const compatibilityName = "NetworkInformation";

    super.fillPopupData(description, compatibilityName, "onLine");
  };
}
