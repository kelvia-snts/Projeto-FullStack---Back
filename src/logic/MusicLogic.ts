import { MusicDatabase } from "../data/MusicDatabase";
import { CustomError } from "../error/CustomError";
import { InvalidInputError } from "../error/InvalidInputError";
import { UnauthorizedError } from "../error/UnauthorizedError";
import { Music, MusicCreationDTO } from "../model/Music";
import { Authenticator } from "../services/Authenticator";
import { IdGenerator } from "../services/IdGenerator";

export class MusicLogic {
  constructor(
    private musicDatabase: MusicDatabase,
    private idGenerator: IdGenerator,
    private authenticator: Authenticator
  ) {}
  async createMusic(music: MusicCreationDTO, token: string) {
    try {
      if (!music.title || !music.file || !music.genre_id || !music.album_id) {
        throw new InvalidInputError("Invalid input to create music");
      }
      const tokenData = this.authenticator.getData(token);
      if (!tokenData) {
        throw new UnauthorizedError("Unauthorized");
      }
      const musicId = this.idGenerator.generate();
      const authorId = tokenData.id;

      await this.musicDatabase.createMusic(
        Music.toMusicModel({
          ...music,
          id: musicId,
          author_id: authorId,
          date: new Date(),
        })!
      );
    } catch (error) {
      throw new CustomError(error.statusCode, error.message);
    }
  }

  async getUserMusic(token: string): Promise<Music> {
    const tokenData = this.authenticator.getData(token);
    const id = tokenData.id;
    const musics = await this.musicDatabase.getUserMusics(id);   
    if (!tokenData) {
      throw new UnauthorizedError("Unauthorized");
    }
    return musics;
  }

  async getAllMusics(token: string): Promise<Music> {
    const tokenData = this.authenticator.getData(token);
    const result = this.musicDatabase.getMusics();

    if (!tokenData) {
      throw new UnauthorizedError("Unauthorized");
    }
    return result;
  }

  async getMusicById(id: string, token: string): Promise<Music> {
    const tokenData = this.authenticator.getData(token);
    const result = await this.musicDatabase.getMusicByIdOrFail(id);
    if (!tokenData) {
      throw new UnauthorizedError("Unauthorized");
    }
    return result;
  }
}
