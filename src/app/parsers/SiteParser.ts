import { GithubState } from "@/constants/GithubState";
import { IIssue } from "@/models/interfaces/IIssue";
import { Issue } from "@/models/Issue";
import { BaseParser } from "@/parsers/BaseParser";

export class SiteParser extends BaseParser {
  /**
   * Processes data as "text/html", setting ".message_group" as a starting point.
   */
  public constructor(data: string) {
    // Tree:
    //  .message_group
    //    |.message
    //    |.message
    super(data, "text/html", ".message_group");
  }

  /**
   * Parses given data trying to cast it to the Issue model.
   * @see {Issue}
   */
  public parse(): IIssue | undefined {
    if (!this.__root) {
      return;
    }

    this.__root = this.__root.querySelector(".message");

    const model = new Issue();

    model.guid = this.getGUID();
    model.title = this.getTitle();
    model.description = this.getTitle();
    model.date = this.getDate();
    model.status = this.getStatus();

    return model;
  }

  /**
   * Gets title.
   */
  private getTitle(): string {
    return this.__root.querySelector(".title").innerHTML;
  }

  /**
   * Gets status from the attribute of the root element.
   * If status is empty, tries to get it from the class list.
   * Basically, we suppose that empty status means the service works well, but we should check it.
   */
  private getStatus(): GithubState {
    // Suppose, there are more than one "message" element
    const status = this.__root.getAttribute("data-status");

    if (status) {
      return status in GithubState ? GithubState[status] : GithubState.inactive;
    } else {
      // otherwise get status from the class list

      for (const item in GithubState) {
        if (this.__root.classList.contains(item)) {
          return GithubState[item] as GithubState;
        }
      }

      return GithubState.inactive;
    }
  }

  /**
   * Gets date.
   */
  private getDate(): Date {
    return new Date(this.__root.querySelector("time").getAttribute("datetime"));
  }

  /**
   * Gets ID, a parsed timestamp, of issue from the attribute.
   */
  private getGUID(): string {
    const id = this.__root.querySelector("time").getAttribute("datetime");

    return id.replace(/[:+T\-]/g, "").slice(0, -4);
  }
}
