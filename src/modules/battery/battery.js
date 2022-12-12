import Control from "control";
import Card from "card";
import Compatibility from "../tools/compatibility/compatibility";

export default class Battery extends Card {
  chargingTime
  dischargingTime
  chargingTimeInfo

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

      // Battery charging time
      this.chargingTime = battery.chargingTime;
      this.dischargingTime = battery.dischargingTime;

      battery.addEventListener("chargingtimechange", () => {
        this.chargingTime = battery.chargingTime;
        this.changeChargingTimeDataInPopup();
      });
      battery.addEventListener("dischargingtimechange", () => {
        this.dischargingTime = battery.dischargingTime;
        this.changeChargingTimeDataInPopup();
      });
    });
  };

  fillPopupData = () => {
    const descriptionWrapper = new Control(
      this.popup.popupContent.node,
      "div",
      "description-wrapper"
    );

    descriptionWrapper.node.innerHTML = `
      <p>The <strong><code class="${localStorage.getItem("theme")}">Navigator.getBattery()</code></strong> method provides information about the system's battery.</p>
      <p>It returns <strong><code class="${localStorage.getItem("theme")}">BatteryManager</code></strong> object which provide also some new events you can handle to monitor the battery status.</p>
      <p>BatteryManager can determine if the device is charging, the level of charge as well as the approximate time required for complete charge and discharge.</p>
      <p>For some reason, I could not get the exact charging time for my device and did not add this information to the card, but maybe it will be possible to find out the time for your device...</p>
    `;

    const chargingTime = new Control(descriptionWrapper.node, "p");

    this.chargingTimeInfo = new Control(chargingTime.node, "code", "", `Time to charge: ${this.chargingTime}\tTime to discharge: ${this.dischargingTime}`);

    new Compatibility(this.popup.popupContent.node, "BatteryManager");
  };

  changeChargingTimeDataInPopup = () => {
    this.chargingTimeInfo.node.innerHTML = `Time to charge: ${this.chargingTime}\tTime to discharge: ${this.dischargingTime}`;
  }
}
