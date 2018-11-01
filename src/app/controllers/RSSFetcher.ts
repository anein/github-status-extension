import {IFetcher} from "@/controllers/interfaces/IFetcher";
import {IIssue} from "@/models/interfaces/IIssue";
import {RSSParser} from "@/parsers/RSSParser";
import {RSSRepository} from "@/repository/RSSRepository";

export class RSSFetcher implements IFetcher {

  public async fetch(): Promise<IIssue | undefined> {

    const data = await (new RSSRepository()).get();

    if (!data) {
      return;
    }

    return (new RSSParser(data)).parse();

  }

}
