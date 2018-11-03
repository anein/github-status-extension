import { MessageType } from "@/constants/MessageType";
import { Fetcher } from "@/controllers/Fetcher";
import { RSSFetcher } from "@/controllers/RSSFetcher";
import { SiteFetcher } from "@/controllers/SiteFetcher";
import { IIssue } from "@/models/interfaces/IIssue";
import { StorageSingleton } from "@/models/StorageModel";

(() => {
  /**
   * Gets github issues.
   *
   * 1. Make an attempt to fetch issues
   * 2. Set a new issue to BrowserAction: message and icon
   * 3. Update popup.
   * 4. Save a new issue to the storage
   *
   */
  async function getGithubStatus() {
    // 1. Make an attempt to fetch issues
    const fetcher = new Fetcher();
    fetcher.addBehaviour(new RSSFetcher());
    fetcher.addBehaviour(new SiteFetcher());

    const issue = await fetcher.fetch();

    if (!issue) {
      return;
    }

    updateBrowserAction(issue);
    updatePopup(issue);
    addToStorage(issue);
  }

  /**
   * Updates the browser action icon: set a _title and new icon.
   *
   * @param model
   */
  function updateBrowserAction(model: IIssue) {
    chrome.browserAction.setTitle({ title: `${model.description} \nDate: ${new Date(model.date).toLocaleString()}` });
    chrome.browserAction.setIcon({ path: model.icons });
  }

  /**
   * Adds current and previous models to the storage.
   *
   */
  function addToStorage(model: IIssue) {
    StorageSingleton.Instance.currentStatus = model;
    StorageSingleton.Instance.save();
  }

  /**
   * Sends data to popup.
   *
   */
  function updatePopup(model: IIssue) {
    chrome.runtime.sendMessage({ name: MessageType.POPUP_UPDATE, data: model });
  }

  //
  chrome.runtime.onInstalled.addListener(() => {
    getGithubStatus();

    chrome.alarms.create(MessageType.ALARM_TICK, { periodInMinutes: 1 });
  });

  chrome.alarms.onAlarm.addListener(alarm => {
    if (alarm.name === MessageType.ALARM_TICK) {
      getGithubStatus();
    }
  });
})();
