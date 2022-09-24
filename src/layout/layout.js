import Control from "../modules/tools/control";
import Main from "./main/main";
import "./main/main.scss";

export default class Layout {
  constructor(container) {
    new Main(container);
    this.importLibs();
  }

  importLibs() {
    this.importIonIcon();
  }

  importIonIcon() {
    const ionIcon = new Control(document.body, "script");
    ionIcon.node.setAttribute("type", "module");
    ionIcon.node.setAttribute(
      "src",
      "https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"
    );

    const ionIconNoModule = new Control(document.body, "script");
    ionIcon.node.setAttribute("nomodule", "");
    ionIcon.node.setAttribute(
      "src",
      "https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"
    );
  }
}
