import "./styles/index.scss";
import Battery from "./modules/battery/battery";

const root = document.querySelector('#root');

new Battery(root);