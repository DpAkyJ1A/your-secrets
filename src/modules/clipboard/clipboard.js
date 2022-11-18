import Control from "control";
import Card from "card";

export default class Clipboard extends Card {
  constructor(container) {
    super(container, "Clipboard");
    
    const clipboardText = new Control(this.card.node, "textarea", "clipboard-text");
    clipboardText.node.setAttribute("placeholder", "Press the button below :)");

    const controls = new Control(this.card.node, "div", "controls");

    const clipboardReadBtn = new Control(
      controls.node,
      "button",
      "btn dark-theme",
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
      "btn dark-theme",
      "Open"
    );
  }
}