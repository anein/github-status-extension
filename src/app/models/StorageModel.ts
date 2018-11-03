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

  get previousStatus(): IIssue {
    return this.__previousStatus;
  }

  get currentStatus(): IIssue {
    return this.__status;
  }

  /**
   * Sets a new status, and save the previous status.
   *
   */
  set currentStatus(model: IIssue) {
    this.__status = model;
  }

  /**
   * Hide constructor
   */
  private constructor() {}

  public async save() {
    try {
      const data = (await this.fetch()) as IStorage;

      this.__previousStatus = data && data.current && data.current.guid !== this.__status.guid ? data.current : null;

      chrome.storage.local.set(this.getStatuses());
    } catch (e) {
      return;
    }
  }

  public async fetch() {
    return await new Promise((resolve, reject) => {
      chrome.storage.local.get((data: IStorage) => {
        resolve(data);
      });
    });
  }

  /**
   * Gets saved statuses.
   */
  private getStatuses(): IStorage {
    //
    return {
      current: this.__status ? this.__status.serialize() : null,
      previous: this.__previousStatus ? this.__previousStatus : null
    };
  }
}
