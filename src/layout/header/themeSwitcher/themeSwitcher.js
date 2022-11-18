import Control from "../../../modules/tools/control";

export default class ThemeSwitcher {
  themeSwitcher;
  darkTheme = true;
  darkThemeIcon;
  lightThemeIcon;

  constructor(container) {
    this.themeSwitcher = new Control(
      container,
      "button",
      "header__theme-switcher dark-theme"
    );
    this.themeSwitcher.node.onclick = this.changeTheme;

    this.darkThemeIcon = new Control(this.themeSwitcher.node, "ion-icon");
    this.darkThemeIcon.node.setAttribute("name", "moon-outline");

    this.lightThemeIcon = new Control(this.themeSwitcher.node, "ion-icon");
    this.lightThemeIcon.node.setAttribute("name", "sunny-outline");
    this.lightThemeIcon.node.style.display = "none";
  }

  changeTheme = () => {
    if (this.darkTheme) {
      document.querySelectorAll(".dark-theme").forEach((element) => {
        element.classList.remove("dark-theme");
        element.classList.add("light-theme");
      });
      this.darkThemeIcon.node.style.display = "none";
      this.lightThemeIcon.node.style.display = "unset";
    } else {
      document.querySelectorAll(".light-theme").forEach((element) => {
        element.classList.remove("light-theme");
        element.classList.add("dark-theme");
      });
      this.darkThemeIcon.node.style.display = "unset";
      this.lightThemeIcon.node.style.display = "none";
    }
    this.darkTheme = !this.darkTheme;
  };
}
