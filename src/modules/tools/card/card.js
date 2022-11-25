import Control from "../control";
import Popup from "../popup/popup";

export default class Card {
  card;
  cardHeader;
  cardInfo;
  popup;
  constructor(container, headerText = '') {
    this.card = new Control(container, "div", "card dark-theme");
    this.cardHeader = new Control(
      this.card.node,
      "h2",
      "card__header",
      headerText
    );
    this.cardInfo = new Control(
      this.card.node,
      "ion-icon",
      "card__info"
    );
    this.cardInfo.node.setAttribute("name", "information-circle-outline");
    this.popup = new Popup(this.card.node, headerText);
    this.cardInfo.node.onclick = this.popup.show;
  }

  errorCatcher = (func) => {
    try {
      func();
    } catch (error) {
      this.addErrorMessage(this.card.node);
    }
  }

  addErrorMessage = (node) => {
    new Control(node, "h3", "card__error", "I can't get this information :(");
  }
}
