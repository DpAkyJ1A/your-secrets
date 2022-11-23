export default class ThemeController {
  THEMES = ["dark-theme", "light-theme"];
  defaultTheme = this.THEMES[0];
  theme;

  constructor() {
    this.theme = localStorage.getItem("theme") || this.defaultTheme;
  }

  getTheme = () => {
    return this.theme;
  }
  
  getNextTheme = () => {
    const i = this.THEMES.indexOf(this.theme);
    const newI = (i + 1) % this.THEMES.length;
    return this.THEMES[newI];
  }
  
  setNextTheme = () => {
    this.theme = this.getNextTheme();
  }
}