import Control from "../control";

export default class Popup {
  popup
  popupContent
  constructor() {
    this.popup = new Control(document.body, "div", "popup");
    this.popupContent = new Control(this.popup.node, "div", "popup__content");

    this.popup.node.onclick = (event) => {
      if (event.target.classList.contains("popup")) {
        this.hide();
      }
    };
  }

  show = () => {
    this.popup.node.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  hide = () => {
    this.popup.node.classList.remove("active");
    document.body.style.overflow = "unset";
  }
}