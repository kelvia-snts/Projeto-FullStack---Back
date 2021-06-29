import { MusicDatabase } from "../data/MusicDatabase";
import { InvalidInputError } from "../error/InvalidInputError";
import { UnauthorizedError } from "../error/UnauthorizedError";
import { Music, MusicCreation } from "../model/Music";
import { Authenticator } from "../services/Authenticator";
import { IdGenerator } from "../services/IdGenerator";

export class MusicLogic {
  constructor(
    private musicDatabase: MusicDatabase,
    private idGenerator: IdGenerator,
    private authenticator: Authenticator
  ) {}

  async createMusic(input: MusicCreation, token: string) {
    const tokenData = this.authenticator.getData(token);
    const authorId = tokenData.id;

    if (!tokenData) {
      throw new UnauthorizedError("Unauthorized");
    }
    if (!input.title || !input.file || !input.genreId || !input.album) {
      throw new InvalidInputError("Invalid input to create music");
    }

    await this.musicDatabase.createMusic(
      Music.toMusicModel({
        ...input,
        id: this.idGenerator.generate(),
        author: authorId,
        date: new Date(),
      })!
    );
  }

  async getMusicById(input: string): Promise<Music> {
    if (!input) {
      throw new InvalidInputError("invalid input to show music");
    }
    return this.musicDatabase.getMusicByIdOrFail(input);
  }
}
