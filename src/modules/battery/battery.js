import Control from "control";
import Card from "card";
import CompatibilityTable from "../tools/compatibilityTable/compatibilityTable";

export default class Battery extends Card {
  constructor(container) {
    super(container, "Battery");

    this.errorCatcher(this.fillCardData);
    this.fillPopupData();
  }

  fillCardData = () => {
    navigator.getBattery().then((battery) => {
      const batteryBox = new Control(this.card.node, "div", "batteryBox");
      const charge = new Control(batteryBox.node, "div", "charge");

      const chargePercent = new Control(this.card.node, "h3", "card__text");

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
  };

  fillPopupData = () => {
    new CompatibilityTable(this.popup.popupContent.node, "getBattery");
  };
}