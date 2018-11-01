import { IFetcher } from "@/controllers/interfaces/IFetcher";
import { IIssue } from "@/models/interfaces/IIssue";
import { SiteParser } from "@/parsers/SiteParser";
import { SiteRepository } from "@/repository/SiteRepository";

export class SiteFetcher implements IFetcher {
  public async fetch(): Promise<IIssue | undefined> {
    const data = await new SiteRepository().get();

    if (!data) {
      return;
    }

    return new SiteParser(data).parse();
  }
}
