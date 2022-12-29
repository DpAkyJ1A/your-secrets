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
    clipboardText.node.setAttribute("placeholder", "Press buttons below :)");

    const controls = new Control(this.card.node, "div", "controls");

    const clipboardReadBtn = new Control(
      controls.node,
      "button",
      "btn",
      "Read"
    );
    clipboardReadBtn.node.onclick = () => {
      navigator.clipboard.readText().then((clipText) => {
        clipboardText.node.value = clipText;
        console.log(clipText);
      });
    };

    const copyBackwardsTextarea = new Control(
      controls.node,
      "button",
      "btn",
      "Copy backwards"
    );
    copyBackwardsTextarea.node.onclick = () => {
      const reverseString = [...clipboardText.node.value].reverse().join("");
      navigator.clipboard.writeText(reverseString);
    };
    const clearTextarea = new Control(
      controls.node,
      "button",
      "btn",
      "Cls"
    );
    clearTextarea.node.onclick = () => {
      clipboardText.node.value = '';
    };
  };

  fillPopupData = () => {
    const descriptionWrapper = new Control(
      this.popup.popupContent.node,
      "div",
      "description-wrapper"
    );

    descriptionWrapper.node.innerHTML = `
      <p>The <strong><code class="${localStorage.getItem("theme")}">Clipboard</code></strong> 
        interface implements the <a class="link" href="https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API">Clipboard API</a>,
        providing (if the user grants permission) both read and write access to the contents of the system clipboard.
      </p>
      <p>The Clipboard API can be used to implement cut, copy, and paste features within a web application.</p>
      <p>The system clipboard is exposed through the global <strong><code class="${localStorage.getItem("theme")}">Navigator.clipboard</code></strong> property.</p>
    `;

    new Compatibility(this.popup.popupContent.node, "Clipboard");
  };
}
