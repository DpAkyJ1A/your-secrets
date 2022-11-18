import Control from "../control";

export default class Card {
  card;
  cardHeader;
  constructor(container, headerText = '') {
    this.card = new Control(container, "div", "card dark-theme");
    this.cardHeader = new Control(
      this.card.node,
      "h2",
      "card__header",
      headerText
    );
  }
}
