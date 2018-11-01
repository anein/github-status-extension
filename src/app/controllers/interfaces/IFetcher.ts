import {IIssue} from "@/models/interfaces/IIssue";

export interface IFetcher {

  fetch: () => Promise<IIssue | undefined>;

}
