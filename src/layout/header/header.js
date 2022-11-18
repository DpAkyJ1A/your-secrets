import Control from "../../modules/tools/control";

export default class Header {
  header;
  constructor(container) {
    this.header = new Control(container, "header", "header");
    
    new Control(this.header.node, "h1", "header__title", "Your Secrets");
  }
}