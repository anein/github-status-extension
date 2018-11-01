import {GithubState} from "@/constants/GithubState";
import {IIcons} from "@/models/interfaces/IIcons";

export interface IIssue {

  date: Date | string;

  description: string;

  guid: number | string;

  icons?: IIcons;

  status: GithubState;

  title: string;

  serialize?: () => IIssue;
}
