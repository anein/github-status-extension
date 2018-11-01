import {Path} from "@/constants/Path";
import {IRepository} from "@/repository/interfaces/IRepository";

export class RSSRepository implements IRepository {
  /**
   * Makes a GET request to github.com
   *
   */
  public async get() {
    try {
      const response = await fetch(Path.GITHUB_STATUS_RSS);
      return await response.text();
      // return (async () => (await fetch(Path.GITHUB_STATUS_RSS)).text())();
    } catch (e) {
      return null;
    }
  }

}
