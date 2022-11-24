import Control from "../control";

export default class Popup {
  popup
  popupContent
  constructor(node) {
    this.popup = new Control(node, "div", "popup");
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
    this.popup.node.classList.add("remove");
    document.body.style.overflow = "unset";
    setTimeout(() => {
      this.popup.node.classList.remove("active");
      this.popup.node.classList.remove("remove");
    }, 500);
  }
}