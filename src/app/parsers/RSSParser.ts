import { GithubState } from "@/constants/GithubState";
import { IIssue } from "@/models/interfaces/IIssue";
import { Issue } from "@/models/Issue";
import { BaseParser } from "@/parsers/BaseParser";

export class RSSParser extends BaseParser {
  private readonly STATUS_REG = /\[(\w+)]/;
  private readonly GUID_REG = /#([0-9]*)/;

  /**
   * Processes data as "text/xml", setting the 'item' element as a starting point for main parsing.
   */
  public constructor(data: string) {
    super(data, "text/xml", "item");
  }

  public parse(): IIssue | undefined {
    if (!this.__root) {
      return;
    }

    const model = new Issue();

    model.guid = this.getGUID();
    model.title = this.getTitle();
    model.description = this.getDescription();
    // TODO: optimize
    model.status = this.getStatusFromTitle(model.title);
    model.date = this.getDate();

    return model;
  }

  private getTitle(): string {
    return this.__root.querySelector("title").innerHTML;
  }

  private getDescription() {
    return this.__root.querySelector("description").innerHTML;
  }

  private getDate(): Date {
    return new Date(this.__root.querySelector("pubDate").innerHTML);
  }

  /**
   * Extracts a status from the title using Regex.
   * @see {@link STATUS_REG}
   *
   * @return {GithubState} status, otherwise undefined
   */
  private getStatusFromTitle(title: string): GithubState {
    const matcher = title.split(this.STATUS_REG).filter(item => item);
    return matcher.length >= 2 && matcher[0] in GithubState ? GithubState[matcher[0]] : GithubState.inactive;
  }

  /**
   * Gets an issue number from the issue link.
   */
  private getGUID(): string {
    // TODO: check format of pubDate
    return new Date( this.__root.querySelector( "pubDate" ).innerHTML )
      .toJSON()
      .replace( /[:+T\-\.Z]/g, "" )
      .slice( 0, -3 );
  }
}
