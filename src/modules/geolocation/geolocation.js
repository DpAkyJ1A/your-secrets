import Control from "control";
import Card from "card";

export default class Geolocation extends Card {
  constructor(container) {
    super(container, "Geolocation");

    this.errorCatcher(this.fillCardData);
    this.fillPopupData();
  }

  fillCardData = () => {
    const map = new Control(this.card.node, "div", "map");

    const coordsWrapper = new Control(this.card.node, "div", "coords-wrapper");

    const latitude = new Control(
      coordsWrapper.node,
      "h3",
      "latitude",
      "Latitude: —"
    );

    const longitude = new Control(
      coordsWrapper.node,
      "h3",
      "longitude",
      "Longitude: —"
    );

    const accuracy = new Control(
      this.card.node,
      "h3",
      "accuracy",
      "Accuracy: —"
    );

    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };

    function success(pos) {
      const crd = pos.coords;

      latitude.node.innerText = `Latitude: ${crd.latitude}`;
      longitude.node.innerText = `Longitude: ${crd.longitude}`;
      accuracy.node.innerText = `Accuracy: +\\- ${crd.accuracy} meters`;
    }

    function error(err) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }

    const getCurrentPositionBtn = new Control(
      this.card.node,
      "button",
      "btn",
      "Get current position"
    );
    getCurrentPositionBtn.node.onclick = () => {
      navigator.geolocation.getCurrentPosition(success, error, options);
    };
  };

  fillPopupData = () => {
    const description = ``;

    const compatibilityName = "Geolocation";

    super.fillPopupData(description, compatibilityName);
  };
}
