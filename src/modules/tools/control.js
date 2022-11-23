import Theme from "./themeController";

class Control {
  node;

  constructor(parentNode, tagName = "div", className = "", content = "") {
    const el = document.createElement(tagName);
    const theme = new Theme();
    el.className = `${className} ${theme.getTheme()}`;
    el.innerHTML = content;
    if (parentNode) {
      parentNode.append(el);
    }
    this.node = el;
  }

  destroy() {
    this.node.remove();
  }
}

export default Control;
