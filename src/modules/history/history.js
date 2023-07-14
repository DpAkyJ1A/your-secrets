import Control from "control";
import Card from "card";
import { getHTML } from "decoratingFunctions";

export default class History extends Card {
  constructor(container) {
    super(container, "History");

    this.errorCatcher(this.fillCardData);
    this.fillPopupData();
  }

  fillCardData = () => {
    const history = window.history;

    const content = new Control(this.card.node, "div", "card__content");

    const numberOfRecords = new Control(
      content.node,
      "h4",
      "card__text",
      `Number of records: ${getHTML(history.length)}`
    );

    new Control(
      content.node,
      "h4",
      "card__text",
      `You came from:`
    );

    new Control(
      content.node,
      "h4",
      "card__text",
      `<a class="link" href="${document.referrer}">${getHTML(
        document.referrer
      )}</a>`
    );

    const controlsWrapper = new Control(
      content.node,
      "div",
      "line",
    );

    const backBtn = new Control(controlsWrapper.node, "button", "btn", "Go back");
    backBtn.node.onclick = () => { history.back() };
    if (history.length < 2) backBtn.node.disabled = true;

    const forwardBtn = new Control(controlsWrapper.node, "button", "btn", "Go forward");
    forwardBtn.node.onclick = () => { history.forward() };
    if (history.length < 2) forwardBtn.node.disabled = true;
  };

  fillPopupData = () => {
    const description = `<p>The <strong><code class="${localStorage.getItem(
      "theme"
    )}">History</code></strong> interface allows manipulation of the browser session history, that is the pages visited in the tab or frame that the current page is loaded in.</p>
    <p>Not only is the history limited to only a tab, but it is also impossible to get the url of previously visited sites, except for the previous one (hehe), which can be obtained using the <strong><code class="${localStorage.getItem(
      "theme"
    )}">document.referrer</code></strong> property, which is available in any browser.</p>
    <p>It is important to note that the address of the last visited site is available only if the user came to the page directly (not through a link, but, for example, through a bookmark).</p>
    <p>It is not difficult to guess what sites usually use this property for - web traffic analytics. So you can find out from which resources the most clicks are made on the link in order to make appropriate marketing decisions in the future.</p>
    <p>So be aware, support might know where you're coming from :)</p>`;

    const compatibilityName = "History";

    super.fillPopupData(description, compatibilityName);
  };
}
