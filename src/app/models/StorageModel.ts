import { IIssue } from "@/models/interfaces/IIssue";
import { IStorage } from "@/models/interfaces/IStorage";

/**
 * Stores current and previous statuses.
 */
export class StorageSingleton {

  /**
   * Store instance
   */
  private static __instance: StorageSingleton;

  /**
   * Previous status of github
   */
  private __previousStatus: IIssue;

  /**
   * Current status of github
   */
  private __status: IIssue;

  /**
   * Singleton
   *
   */
  static get Instance() {
    if (!this.__instance) {
      this.__instance = new StorageSingleton();
    }
    return this.__instance;
  }

  get currentStatus(): IIssue {
    return this.__status;
  }

  /**
   * Sets a new status, and save the previous status.
   *
   */
  set currentStatus(model: IIssue) {
    if (this.__status && this.__status.guid !== model.guid) {
      this.__previousStatus = Object.assign({}, this.__status);
    }

    this.__status = model;
  }

  /**
   * Hide constructor
   */
  private constructor() {

  }

  public save() {
    chrome.storage.local.set(this.getStatuses());
  }

  public async fetch() {

    return await (new Promise((resolve, reject) => {
      chrome.storage.local.get((data: IStorage) => {
        resolve(data);
      });
    }));

  }

  /**
   * Gets saved statuses.
   */
  private getStatuses(): IStorage {
    //
    return {
      current : (this.__status) ? this.__status.serialize() : null,
      previous: (this.__previousStatus) ? this.__previousStatus : null
    };
  }

}
