import Control from "control";
import Card from "card";
import Compatibility from "../tools/compatibility/compatibility";

export default class Clipboard extends Card {
  constructor(container) {
    super(container, "Clipboard");

    this.errorCatcher(this.fillCardData);
    this.fillPopupData();
  }

  fillCardData = () => {
    const clipboardText = new Control(
      this.card.node,
      "textarea",
      "clipboard-text"
    );
    clipboardText.node.setAttribute("placeholder", "Press the button below :)");

    const controls = new Control(this.card.node, "div", "controls");

    const clipboardReadBtn = new Control(
      controls.node,
      "button",
      "btn",
      "Read"
    );
    clipboardReadBtn.node.onclick = () => {
      navigator.clipboard.readText().then((clipText) => {
        clipboardText.node.innerText = clipText;
      });
    };

    const openTextareaOnFullScreen = new Control(
      controls.node,
      "button",
      "btn",
      "Open"
    );
  };

  fillPopupData = () => {
    new Compatibility(this.popup.popupContent.node, "clipboard");
  };
}
