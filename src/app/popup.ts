import { MessageType } from "@/constants/MessageType";
import { IIssue } from "@/models/interfaces/IIssue";
import { IMessage } from "@/models/interfaces/IMessage";
import { IStorage } from "@/models/interfaces/IStorage";
import { StorageSingleton } from "@/models/StorageModel";

(() => {
  async function onInit() {
    const data = (await StorageSingleton.Instance.fetch()) as IStorage;

    if (!data) {
      showEmptyBlock(true);
      return;
    } else {
      showEmptyBlock(false);
    }

    // set data to popup.html
    for (const [key, value] of Object.entries(data)) {
      render(`.${key}-status`, value);
    }
  }

  /**
   * Renders data.
   */
  function render(selector: string, model: IIssue) {
    const parent = document.querySelector(`${selector}`);

    if (!parent || !model) {
      return;
    }

    parent.classList.remove("hide");

    for (let [key, value] of Object.entries(model)) {
      const element = parent.querySelector(`[data-name='${key}']`);

      if (!element) {
        continue;
      }

      switch (key) {
        case "status":
          element.classList.add(value);
          break;
        case "date":
          value = new Date(value).toLocaleString();
          break;
        default:
          break;
      }

      element.innerHTML = value;

    }
  }

  /**
   * Shows or hides the empty box.
   */
  function showEmptyBlock(show: boolean) {
    const element = document.querySelector(".empty");

    if (show) {
      element.classList.remove("hide");
    } else {
      element.classList.add("hide");
    }
  }

  chrome.runtime.onMessage.addListener((message: IMessage) => {

    if (message.name !== MessageType.POPUP_UPDATE) {
      return;
    }

    onInit();

  });

  onInit();

})();
