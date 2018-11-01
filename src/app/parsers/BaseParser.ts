import { IIssue } from "@/models/interfaces/IIssue";
import { IParser } from "@/parsers/interfaces/IParser";

export abstract class BaseParser implements IParser {
  protected __root: Element;

  protected constructor(data: string, type: SupportedType, rootSelector: string) {
    const parsedData = new DOMParser().parseFromString(data, type);

    this.__root = parsedData.querySelector(rootSelector) || undefined;
  }

  public abstract parse(): IIssue | undefined;
}
