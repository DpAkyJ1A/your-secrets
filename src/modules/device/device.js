import Control from "control";
import Card from "card";

export default class Device extends Card {
  constructor(container) {
    super(container, "Device");

    const chargePercent = new Control(this.card.node, "h3", "card__text");

  }
}
