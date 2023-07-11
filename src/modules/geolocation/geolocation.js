import Control from "control";
import Card from "card";
import { Loader } from "@googlemaps/js-api-loader";
import { getHTML } from "decoratingFunctions";

export default class Geolocation extends Card {
  constructor(container) {
    super(container, "Geolocation");

    this.errorCatcher(this.fillCardData);
    this.fillPopupData();
  }

  fillCardData = () => {
    const map = new Control(this.card.node, "div", "map hide");

    const loader = new Loader({
      apiKey: process.env.GOOGLE_MAP_API_KEY,
      version: "weekly",
    });

    loader.load().then(async () => {
      const { Map } = await google.maps.importLibrary("maps");

      new Map(map.node, {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 12,
      });
    });

    const coordsWrapper = new Control(this.card.node, "div", "line");

    const latitude = new Control(
      coordsWrapper.node,
      "h4",
      "card__text",
      `Latitude: ${getHTML("&#8212")}`
    );

    const longitude = new Control(
      coordsWrapper.node,
      "h4",
      "card__text",
      `Longitude: ${getHTML("&#8212")}`
    );

    const accuracy = new Control(
      this.card.node,
      "h4",
      "card__text",
      `Accuracy: ${getHTML("&#8212")}`
    );

    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };

    function success(pos) {
      const crd = pos.coords;

      latitude.node.innerHTML = `Latitude: ${getHTML(crd.latitude)}`;
      longitude.node.innerHTML = `Longitude: ${getHTML(crd.longitude)}`;
      accuracy.node.innerHTML = `Accuracy: ${getHTML(crd.accuracy.toFixed(2))} meters`;

      loader.load().then(async () => {
        const { Map } = await google.maps.importLibrary("maps");

        const googleMap = new Map(map.node, {
          center: { lat: crd.latitude, lng: crd.longitude },
          zoom: 12,
        });

        new google.maps.Marker({
          position: { lat: crd.latitude, lng: crd.longitude },
          map: googleMap,
          title: "You are here!",
        });
      });

      map.node.classList.remove("hide");
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
    const description = `
    <p>The <strong><code class="${localStorage.getItem(
      "theme"
    )}">Geolocation</code></strong> interface represents an object able to obtain the position of the device programmatically. It gives Web content access to the location of the device.</p>
    <p>Location can be both obtained once and tracked constantly.</p>
    <p>To get a location, the site must have the appropriate permission, and geolocation is enabled on the device.</p>
    <p>To display location on map I use <a class="link" href="https://www.npmjs.com/package/@googlemaps/js-api-loader">@googlemaps/js-api-loader</a>.</p>
    `;

    const compatibilityName = "Geolocation";

    super.fillPopupData(description, compatibilityName);
  };
}
