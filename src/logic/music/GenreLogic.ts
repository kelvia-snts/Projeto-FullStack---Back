import { GenreDatabase } from "../../data/musics/GenreDatabase";
import { CustomError } from "../../error/CustomError";
import { InvalidInputError } from "../../error/InvalidInputError";
import { UnauthorizedError } from "../../error/UnauthorizedError";
import { Genre, GenreDTO } from "../../model/Genre";
import { Authenticator } from "../../services/Authenticator";
import { IdGenerator } from "../../services/IdGenerator";

export class GenreLogic {
  constructor(
    private genreDatabase: GenreDatabase,
    private idGenerator: IdGenerator,
    private authenticator: Authenticator
  ) {}

  async createGenre(genre: GenreDTO, token: string) {
    try {
      if (!genre.name) {
        throw new InvalidInputError("Invalid input to create genre");
      }
      const tokenData = this.authenticator.getData(token);
      if (!tokenData) {
        throw new UnauthorizedError("Unauthorized");
      }
      const genreId = this.idGenerator.generate();

      await this.genreDatabase.createGenre(
        Genre.toGenreModel({
          ...genre,
          id: genreId,
        })!
      );
    } catch (error) {
      throw new CustomError(error.statusCode, error.message);
    }
  }

  async getAllGenres(token: string): Promise<Genre> {
    const tokenData = this.authenticator.getData(token);
    const result = this.genreDatabase.getGenres();
    if (!tokenData) {
      throw new UnauthorizedError("Unauthorized");
    }
    return result;
  }
}
