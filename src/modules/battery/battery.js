import Control from "control";
import Card from "card";

export default class Battery extends Card{
  constructor(container) {
    super(container, "Battery");

    const batteryBox = new Control(this.card.node, 'div', 'batteryBox');
    const charge = new Control(batteryBox.node, 'div', 'charge');

    const chargePercent = new Control(this.card.node, "h3", "card__text");

    navigator.getBattery().then((battery) => {
      updateLevelInfo();
      // Battery percentage
      battery.addEventListener("levelchange", () => {
        updateLevelInfo();
      });
      function updateLevelInfo() {
        let chargePercentage = Math.round(battery.level * 100) + "%";
        charge.node.style.width = chargePercentage;
        chargePercent.node.innerText = chargePercentage;
        updateChargeInfo();
      }

      // Is the battery charging now
      battery.addEventListener("chargingchange", () => {
        updateChargeInfo();
      });
      function updateChargeInfo() {
        if (battery.charging) {
          chargePercent.node.innerHTML = `<ion-icon name="flash"></ion-icon> ${chargePercent.node.innerText}`;
        } else {
          chargePercent.node.innerText = chargePercent.node.innerText.replace(
            "🗲",
            ""
          );
        }
      }
    });
  }
}