import Control from "control";
import Card from "card";
import { getHTML, getBooleanIcon } from "decoratingFunctions";

export default class OtherStuff extends Card {
  constructor(container) {
    super(container, "Other Stuff");

    this.errorCatcher(this.fillCardData);
    this.fillPopupData();
  }

  fillCardData = () => {
    const content = new Control(this.card.node, "div", "card__content");

    const language = new Control(
      content.node,
      "h4",
      "card__text",
      `Language: ${getHTML(navigator.language)}`
    );

    const languagesString = navigator.languages ? navigator.languages.join(", ") : undefined;
    const languages = new Control(
      content.node,
      "h4",
      "card__text",
      `Languages: ${getHTML(languagesString)}`
    );

    const deviceMemory = new Control(
      content.node,
      "h4",
      "card__text",
      `Device memory (RAM): ${getHTML(navigator.deviceMemory)} GB`
    );

    const hardwareConcurrency = new Control(
      content.node,
      "h4",
      "card__text",
      `Number of Cores: ${getHTML(navigator.hardwareConcurrency)}`
    );
    
    const maxTouchPoints = new Control(
      content.node,
      "h4",
      "card__text",
      `Max touch points: ${getHTML(navigator.maxTouchPoints)}`
    );

    const cookieEnabled = new Control(
      content.node,
      "h4",
      "card__text",
      `Cookie Enabled: ${getBooleanIcon(navigator.cookieEnabled)}`
    );
  };

  fillPopupData = () => {
    const description = `<p>The <strong><code class="${localStorage.getItem(
      "theme"
    )}">---</code></strong> ---.</p>`;

    const compatibilityName = "language";

    super.fillPopupData(
      description,
      compatibilityName,
      "languages",
      "deviceMemory",
      "hardwareConcurrency",
      "maxTouchPoints",
      "cookieEnabled"
    );
  };
}
