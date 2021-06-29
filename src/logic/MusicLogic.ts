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

  async getAllMusics(token: string): Promise<void> {
    const tokenData = this.authenticator.getData(token);

    if (!tokenData) {
      throw new UnauthorizedError("Unauthorized");
    }
    return this.musicDatabase.getMusics(token)
  }

  async getMusicById(id: string): Promise<Music> {
    if (!id) {
      throw new InvalidInputError("invalid id to show music");
    }
    return this.musicDatabase.getMusicByIdOrFail(id);
  }
}
