import {IIssue} from "@/models/interfaces/IIssue";

export interface IParser {

  parse: () => IIssue | undefined;

}
