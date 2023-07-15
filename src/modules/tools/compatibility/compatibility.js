import Control from "control";
import CompatibilityTable from "./compatibilityTable/compatibilityTable";

export default class Compatibility {
  compatibilityWrapper;
  compatibilityTablesWrapper;
  constructor(node, ...objArr) {
    this.compatibilityWrapper = new Control(node, "div", "compatibility-wrapper");
    new Control(this.compatibilityWrapper.node, "h3", "subtitle", "Browser compatibility");
    
    objArr.forEach((obj) => {
      this.compatibilityTablesWrapper = new CompatibilityTable(
        this.compatibilityWrapper.node,
        obj
      );
      const link = new Control(
        this.compatibilityWrapper.node,
        "a",
        "link",
        "For more information click here"
      );
      link.node.setAttribute(
        "href",
        `${this.compatibilityTablesWrapper.mdn_url}`
      );
      link.node.setAttribute("target", "_blank");
    });
  }
}