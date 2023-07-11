import Control from "control";
import Card from "card";
import { getHTML } from "decoratingFunctions";

export default class Clipboard extends Card {
  constructor(container) {
    super(container, "Clipboard");

    this.errorCatcher(this.fillCardData);
    this.fillPopupData();
  }

  fillCardData = () => {
    const workspace = new Control(this.card.node, "div", "workspace");
    const clipboardText = new Control(
      workspace.node,
      "textarea",
      "clipboard-text"
    );
    clipboardText.node.setAttribute("placeholder", "Press buttons below :)");

    const workspaceImg = new Control(workspace.node, "img", "workspace__img");

    const workspaceError = new Control(
      workspace.node,
      "div",
      "workspace__error"
    );

    const errorHeader = new Control(workspaceError.node, "h3", "", "Error");

    const errorDescription = new Control(
      workspaceError.node,
      "p",
      "",
      "No valid data on clipboard."
    );

    const workspaceAnotherTypeOfFile = new Control(
      workspace.node,
      "div",
      "workspace__another"
    );

    const anotherDescription = new Control(
      workspaceAnotherTypeOfFile.node,
      "p",
      "",
      "There was not enough funding to process this type of data :)"
    );

    workspaceError.node.style.display = "none";
    workspaceAnotherTypeOfFile.node.style.display = "none";

    const line = new Control(this.card.node, "div", "line");

    const typeOfTheFile = new Control(
      line.node,
      "h4",
      "card__text",
      `Type: ${getHTML("&#8212")}`
    );

    const sizeOfTheFile = new Control(
      line.node,
      "h4",
      "card__text",
      `Size: ${getHTML("&#8212")}`
    );

    const controls = new Control(
      this.card.node,
      "div",
      "line left-margin-remove"
    );

    // const clipboardReadBtn = new Control(
    //   controls.node,
    //   "button",
    //   "btn",
    //   "Read"
    // );
    // clipboardReadBtn.node.onclick = () => {
    //   navigator.clipboard.readText().then((clipText) => {
    //     clipboardText.node.style.display = "block";
    //     workspaceImg.node.style.display = "none";
    //     clipboardText.node.value = clipText;
    //   });
    // };

    // const copyBackwardsTextarea = new Control(
    //   controls.node,
    //   "button",
    //   "btn",
    //   "Copy backwards"
    // );
    // copyBackwardsTextarea.node.onclick = () => {
    //   const reverseString = [...clipboardText.node.value].reverse().join("");
    //   navigator.clipboard.writeText(reverseString);
    // };
    // const clearTextarea = new Control(
    //   controls.node,
    //   "button",
    //   "btn",
    //   "Cls"
    // );
    // clearTextarea.node.onclick = () => {
    //   clipboardText.node.value = '';
    // };

    async function processClipboardFile() {
      try {
        const clipboardItems = await navigator.clipboard.read();
        console.log(clipboardItems);
        for (const clipboardItem of clipboardItems) {
          workspaceError.node.style.display = "none";
          workspaceAnotherTypeOfFile.node.style.display = "none";
          const type = clipboardItem.types[clipboardItem.types.length - 1];
          const blob = await clipboardItem.getType(type);
          const fileSize = blob.size;
          const fileType = type;
          typeOfTheFile.node.innerHTML = `Type: ${getHTML(fileType)}`;
          sizeOfTheFile.node.innerHTML = `Size: ${getHTML(fileSize)} B`;

          if (type.startsWith("text/")) {
            clipboardText.node.style.display = "block";
            workspaceImg.node.style.display = "none";
            navigator.clipboard.readText().then((clipText) => {
              clipboardText.node.value = clipText;
            });
          } else if (type.startsWith("image/")) {
            workspaceImg.node.style.display = "block";
            clipboardText.node.style.display = "none";
            const fileUrl = URL.createObjectURL(blob);
            workspaceImg.node.src = fileUrl;
          }
          else {
            clipboardText.node.style.display = "none";
            workspaceImg.node.style.display = "none";
            workspaceAnotherTypeOfFile.node.style.display = "flex";
          }
        }
      } catch (error) {
        workspaceAnotherTypeOfFile.node.style.display = "none";
        clipboardText.node.style.display = "none";
        workspaceImg.node.style.display = "none";
        console.error("Ошибка чтения буфера обмена: ", error);
        typeOfTheFile.node.innerHTML = `Type: ${getHTML(undefined)}`;
        sizeOfTheFile.node.innerHTML = `Size: ${getHTML(undefined)}`;
        workspaceError.node.style.display = "flex";
      }
    }

    const analysisBtn = new Control(
      controls.node,
      "button",
      "btn",
      "Get info from clipboard"
    );
    analysisBtn.node.onclick = processClipboardFile;

    const putBtn = new Control(
      controls.node,
      "button",
      "btn",
      "Put something..."
    );
    putBtn.node.onclick = () => {
      navigator.clipboard.writeText(
        "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
      );
    };
    const clearTextarea = new Control(
      controls.node,
      "button",
      "btn",
      "Clear"
    );
    clearTextarea.node.onclick = () => {
      workspaceError.node.style.display = "none";
      clipboardText.node.style.display = "block";
      workspaceImg.node.style.display = "none";
      workspaceAnotherTypeOfFile.node.style.display = "none";
      clipboardText.node.value = '';
      typeOfTheFile.node.innerHTML = `Type: ${getHTML("&#8212")}`;
      sizeOfTheFile.node.innerHTML = `Size: ${getHTML("&#8212")}`;
    };
  };

  fillPopupData = () => {
    const description = `
      <p>The <strong><code class="${localStorage.getItem(
        "theme"
      )}">Clipboard</code></strong> 
        interface implements the <a class="link" href="https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API">Clipboard API</a>,
        providing (if the user grants permission) both read and write access to the contents of the system clipboard.
      </p>
      <p>The Clipboard API can be used to implement cut, copy, and paste features within a web application.</p>
      <p>The system clipboard is exposed through the global <strong><code class="${localStorage.getItem(
        "theme"
      )}">Navigator.clipboard</code></strong> property.</p>
      <p>P.S. You can try to insert something other than text ;)</p>
    `;

    const compatibilityName = "Clipboard";

    super.fillPopupData(description, compatibilityName);
  };
}
