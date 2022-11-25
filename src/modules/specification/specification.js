import Control from "control";
import Card from "card";
import CompatibilityTable from "../tools/compatibilityTable/compatibilityTable";

export default class Specification extends Card {
  constructor(container) {
    super(container, "Specification");

    this.errorCatcher(this.fillCardData);
    this.fillPopupData();
  }

  fillCardData = () => {
    const content = new Control(this.card.node, "div", "card__content");
    const storageManager = navigator.storage;
    storageManager.estimate().then((data) => {
      const quotaInBytes = data.quota;
      const quotaInMegaBytes = (quotaInBytes / 1000000).toFixed(2);
      const quotaInGigabytes = (quotaInMegaBytes / 1000).toFixed(2);
      const usageInBytes = data.usage;
      const usageInMegaBytes = (usageInBytes / 1000000).toFixed(2);
      const usageInGigabytes = (usageInMegaBytes / 1000).toFixed(2);

      const quota = new Control(
        content.node,
        "h3",
        "card__text",
        `Quota: ${quotaInGigabytes}GB`
      );
      // quota.node.setAttribute("data-tooltip", "Tip");
      // <ion-icon name="information-circle-outline"></ion-icon>

      new Control(
        content.node,
        "h3",
        "card__text",
        `Usage: ${usageInGigabytes}GB`
      );
      new Control(
        content.node,
        "h3",
        "card__text",
        `Using percentage: ${(usageInGigabytes / quotaInGigabytes).toFixed(2)}%`
      );
    });
  };

  fillPopupData = () => {
    new CompatibilityTable(this.popup.popupContent.node, "storage");
  };
}
