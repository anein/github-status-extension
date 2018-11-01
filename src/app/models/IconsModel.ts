import {GithubState} from "@/constants/GithubState";
import {Path} from "@/constants/Path";
import {IIcons} from "@/models/interfaces/IIcons";

export class IconsModel {

  private __icons: IIcons = {};

  private sizes = [16, 48, 128];

  public get icons(): IIcons {
    return this.__icons;
  }

  public constructor(status: GithubState) {

    for (const size of this.sizes) {
      this.__icons[size] = `${Path.IMAGE}/${status}/icon-${size}x${size}.png`;
    }

  }

}
