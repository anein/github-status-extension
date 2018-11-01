import { IFetcher } from "@/controllers/interfaces/IFetcher";

export class Fetcher {

  private behaviours: IFetcher[] = [];

  public addBehaviour(behaviuor: IFetcher) {

    this.behaviours.push(behaviuor);

  }

  public async fetch() {

    for (const behaviour of this.behaviours) {

      const data = await behaviour.fetch();

      if (data) {
        return data;
      }

    }

    return;

  }

}
