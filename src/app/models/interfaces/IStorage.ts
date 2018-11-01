import {IIssue} from "@/models/interfaces/IIssue";

export interface IStorage {

  current: IIssue;
  previous: IIssue;

}
