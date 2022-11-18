import Control from "../../modules/tools/control";
import Battery from "../../modules/battery/battery";
import Agent from "../../modules/agent/agent";
import Specification from "../../modules/specification/specification";

export default class Main {
  main;
  constructor(container) {
    this.main = new Control(container, 'main', 'main');

    new Agent(this.main.node);
    new Battery(this.main.node);
    new Specification(this.main.node);
  }
}