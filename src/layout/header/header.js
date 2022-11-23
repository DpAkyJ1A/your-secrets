import Control from "../../modules/tools/control";
import ThemeSwitcher from "./themeSwitcher/themeSwitcher";

export default class Header {
  header;
  constructor(container) {
    this.header = new Control(container, "header", "header");
    
    new Control(
      this.header.node,
      "h1",
      "header__title",
      "Your Secrets"
    );

    new ThemeSwitcher(this.header.node);
  }
}