import {Path} from "@/constants/Path";
import {IRepository} from "@/repository/interfaces/IRepository";

export class SiteRepository implements IRepository {
  /**
   *
   */
  public async get() {
    try {
      return await (await fetch(Path.GITHUB_STATUS_SITE)).text();
    } catch (e) {
      return null;
    }
  }

}
