import Control from "control";

export default class Battery {
  card;
  constructor(container) {
    this.card = new Control(container, 'div', 'card');

    const cardHeader = new Control(this.card.node, 'h2', 'card__header', 'Battery')

    const batteryBox = new Control(this.card.node, 'div', 'batteryBox');
    const charge = new Control(batteryBox.node, 'div', 'charge');

    navigator.getBattery().then((battery) => {
      function updateAllBatteryInfo() {
        updateLevelInfo();
        updateChargeInfo();
      }
      updateAllBatteryInfo();
      
      // Battery percentage
      battery.addEventListener("levelchange", () => {
        updateLevelInfo();
      });
      function updateLevelInfo() {
        let chargePercentage = Math.round(battery.level * 100) + "%";
        charge.node.style.width = chargePercentage;
        charge.node.innerText = chargePercentage;
      }

      // Is the battery charging now
      battery.addEventListener("chargingchange", () => {
        updateChargeInfo();
      });
      function updateChargeInfo() {
        if (battery.charging) {
          charge.node.innerText = "🗲" + charge.node.innerText;
          charge.node.before
        } else {
          charge.node.innerText = charge.node.innerText.replace("🗲", "");
        }
      }
    });
  }
}