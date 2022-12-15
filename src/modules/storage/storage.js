import Control from "control";
import Card from "card";
import Compatibility from "../tools/compatibility/compatibility";

export default class Storage extends Card {
  constructor(container) {
    super(container, "Storage");

    this.errorCatcher(this.fillCardData);
    this.fillPopupData();
  }

  fillCardData = () => {
    const content = new Control(this.card.node, "div", "card__content");
    const storageManager = navigator.storage;
    storageManager.estimate().then((data) => {
      const quotaInBytes = data.quota;
      const quotaInMegaBytes = (quotaInBytes / 1000000).toFixed(2);
      const quotaInGigabytes = (quotaInMegaBytes / 1000).toFixed(2);
      const usageInBytes = data.usage;
      const usageInMegaBytes = (usageInBytes / 1000000).toFixed(2);
      const usageInGigabytes = (usageInMegaBytes / 1000).toFixed(2);

      const quota = new Control(
        content.node,
        "h3",
        "card__text",
        `Free space: ${quotaInGigabytes}GB`
      );
      // quota.node.setAttribute("data-tooltip", "Tip");
      // <ion-icon name="information-circle-outline"></ion-icon>

      new Control(
        content.node,
        "h3",
        "card__text",
        `Usage: ${usageInGigabytes}GB`
      );
      new Control(
        content.node,
        "h3",
        "card__text",
        `Usage percentage: ${(usageInGigabytes / quotaInGigabytes).toFixed(2)}%`
      );

      storageManager.persist().then((isGranted) => {
        const permission = new Control(content.node, "h3", "card__text", ``);
        if (isGranted) {
          permission.node.innerHTML = `Browser grants persistent permission <ion-icon name="checkmark-circle-outline" class="card__success permission-icon"></ion-icon>`;
        } else {
          permission.node.innerHTML = `Browser NOT grants persistent permission <ion-icon name="close-circle-outline" class="card__error permission-icon"></ion-icon>`;
        }
      });
    });
  };

  // https://webkit.org/blog/12257/the-file-system-access-api-with-origin-private-file-system/
  // onmessage = async () => {
  //   const root = await navigator.storage.getDirectory();

  //   // // Create a file named Untiled.txt under root directory.
  //   // const untitledFile = await root.getFileHandle("Untitled.txt", { "create" : true });
  //   // // Get access to existing Untitled.txt file.
  //   // // untitledFile and existingUntitledFile point to the same entry.
  //   // const existingUntitledFile = await root.getFileHandle("Untitled.txt");
  //   // // Create a directory named Diary Folder.
  //   // const diaryDirectory = await root.getDirectoryHandle("Diary Folder", { "create": true });

  //   // // Move Untitled.txt from /root/ to /root/Diary Folder/.
  //   // await untitledFile.move(diaryDirectory, untitledFile.name);
  //   // // Rename Untitled.txt to Feb_01.txt
  //   // await untitledFile.move(diaryDirectory, "Feb_01.txt");
  //   // // The two steps above can be combined as:
  //   // // await untitledFile.move(diaryDirectory, "Feb_01.txt");

  //   // // Get access to Feb_01.txt in Diary Folder.
  //   // const diaryFile = await diaryDirectory.getFileHandle("Feb_01.txt");
  //   // // Resolve path between Feb_01.txt and root.
  //   // const relativePath = await root.resolve(diaryFile);
  //   // // relativePath is ["Diary Folder", "Feb_01.txt"].
  //   // console.log(relativePath);

  //   // // Create a directory named Trash under the root directory.
  //   // const trashDirectory = await root.getDirectoryHandle("Trash", { "create" : true });
  //   // // Find directories under root/ and print their names.
  //   // const directoryNames = [];
  //   // for await (const handle of root.values()) {
  //   //     if (handle.kind == "directory") {
  //   //         directoryNames.push(handle.name);
  //   //     }
  //   // }
  //   // directoryNames is ["Trash", "Diary Folder"].

  //   // // Delete Feb_01.txt in Diary Folder.
  //   // await diaryDirectory.removeEntry(diaryFile.name);
  //   // // Delete Trash and all its descendants.
  //   // await root.removeEntry(trashDirectory.name, { "recursive": true });

  //   const fileHandle = await root.getFileHandle("Draft.txt", { create: true });
  //   const file = await fileHandle.getFile();
  //   console.log(file);

  //   // Get access to the existing Draft.txt file.
  //   const draftFile = await root.getFileHandle("Draft.txt");
  //   // Create FileSystemSyncAccessHandle on the file.
  //   // const accessHandle = await draftFile.createSyncAccessHandle();
  //   // // Get size of the file.
  //   // const fileSize = await accessHandle.getSize();
  //   // // Read file content to a buffer.
  //   // const readBuffer = new ArrayBuffer(fileSize);
  //   // const readSize = accessHandle.read(readBuffer, { "at": 0 });
  //   // // Write a sentence to the end of the file.
  //   // const encoder = new TextEncoder();
  //   // const writeBuffer = encoder.encode("Thank you for reading this.");
  //   // const writeSize = accessHandle.write(writeBuffer, { "at" : readSize });
  //   // // Truncate file to 1 byte.
  //   // await accessHandle.truncate(1);
  //   // Persist changes to disk.
  //   // await accessHandle.flush();
  //   // // Always close FileSystemSyncAccessHandle if done.
  //   // await accessHandle.close();
  // };

  fillPopupData = () => {
    const descriptionWrapper = new Control(
      this.popup.popupContent.node,
      "div",
      "description-wrapper"
    );

    descriptionWrapper.node.innerHTML = `
      <p>The <strong><code class="${localStorage.getItem(
        "theme"
      )}">Navigator.storage</code></strong> read-only property returns the singleton StorageManager object used to access the overall storage capabilities of the browser for the current site or app.</p>
      <p>The returned object lets you examine and configure persistence of data stores and learn approximately how much more space your browser has available for use.
      There may be more available space than indicated, but this cannot be relied upon.</p>
      <p>P.S. It is important to understand that different browsers can store different amounts of data, from a few hundred megabytes to hundreds of gigabytes or more. More about it <a href="https://web.dev/storage-for-the-web/#how-much" class="link">here</a>.</p>
      `;

    new Compatibility(this.popup.popupContent.node, "StorageManager");
  };
}
