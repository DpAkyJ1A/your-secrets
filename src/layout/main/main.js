import Control from "../../modules/tools/control";
import Battery from "../../modules/battery/battery";
import Device from "../../modules/device/device";

export default class Main {
  main;
  constructor(container) {
    this.main = new Control(container, 'main', 'main');

    new Device(this.main.node);
    new Battery(this.main.node);
  }
}