import "./styles/index.scss";
import Layout from "./layout/layout";

const root = document.querySelector('#root');

new Layout(root);

document.body.classList.add(localStorage.getItem("theme") || "dark-theme");