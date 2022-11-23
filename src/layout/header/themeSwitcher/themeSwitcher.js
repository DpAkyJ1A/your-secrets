import Control from "../../../modules/tools/control";
import ThemeController from "../../../modules/tools/themeController";

export default class ThemeSwitcher {
  themeController;
  themeSwitcher;
  darkThemeIcon;
  lightThemeIcon;

  constructor(container) {
    this.themeController = new ThemeController();
    this.themeSwitcher = new Control(
      container,
      "button",
      "header__theme-switcher"
    );
    this.themeSwitcher.node.onclick = this.changeTheme;

    this.darkThemeIcon = new Control(this.themeSwitcher.node, "ion-icon");
    this.darkThemeIcon.node.setAttribute("name", "moon-outline");

    this.lightThemeIcon = new Control(this.themeSwitcher.node, "ion-icon");
    this.lightThemeIcon.node.setAttribute("name", "sunny-outline");
  }

  changeTheme = () => {
    const curTheme = this.themeController.getTheme();
    const nextTheme = this.themeController.getNextTheme();

    document.querySelectorAll(`.${curTheme}`).forEach((element) => {
      element.classList.remove(`${curTheme}`);
      element.classList.add(`${nextTheme}`);
    });

    this.themeController.setNextTheme();
  };
}
