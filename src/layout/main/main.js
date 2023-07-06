import Control from "../../modules/tools/control";
import Battery from "../../modules/battery/battery";
import Agent from "../../modules/agent/agent";
import Storage from "../../modules/storage/storage";
import Time from "../../modules/time/time";
import Clipboard from "../../modules/clipboard/clipboard";
import Geolocation from "../../modules/geolocation/geolocation";

export default class Main {
  main;
  constructor(container) {
    this.main = new Control(container, 'main', 'main');

    new Agent(this.main.node);
    new Battery(this.main.node);
    new Storage(this.main.node);
    // works only on server side
    // new Time(this.main.node);
    new Clipboard(this.main.node);
    new Geolocation(this.main.node);
  }
}