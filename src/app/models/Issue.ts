import { GithubState } from "@/constants/GithubState";
import { IconsModel } from "@/models/IconsModel";
import { IIcons } from "@/models/interfaces/IIcons";
import { IIssue } from "@/models/interfaces/IIssue";

export class Issue implements IIssue {
  private __title = "";

  private __status: GithubState = GithubState.inactive;

  private __description = "";

  // pubDate
  private __date: Date;

  private __icons: IIcons;

  private __guid: number;

  set title(value: string) {
    this.__title = value || "";
  }

  get title(): string {
    return this.__title;
  }

  set status(value: GithubState) {
    this.__status = value;
    this.__icons = new IconsModel(value).icons;
  }

  get status(): GithubState {
    return this.__status;
  }

  set description(value: string) {
    this.__description = value || "";
  }

  get description(): string {
    return this.__description;
  }

  set date(value: Date) {
    this.__date = value;
  }

  get date(): Date {
    return this.__date;
  }

  get guid(): number | string {
    return this.__guid;
  }

  set guid(value: number | string) {
    this.__guid = parseInt(value.toString(), 10);
  }

  get icons(): IIcons {
    return this.__icons;
  }

  // set icons(icons: IIcons) {
  //   this.__icons = icons;
  // }

  public serialize(): IIssue {
    return {
      title      : this.__title,
      date       : this.__date.toString(),
      description: this.__description,
      guid       : this.__guid,
      status     : this.__status,
      icons      : this.__icons
    };
  }
}
