import { Genre } from "../model/Genre";
import { BaseDatabase } from "./BaseDatabase";

export class GenreDatabase extends BaseDatabase {
  private static TABLE_NAME = "Genre";

  public async createGenre(genre: Genre): Promise<void> {
    try {
      await this.getConnection()
        .insert({
          id: genre.getId(),
          name: genre.getName(),
        })
        .into(this.tableNames.genres);
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  public async getGenres(): Promise<Genre> {
    const result: any = await this.getConnection()
      .select("*")
      .from(GenreDatabase.TABLE_NAME);
    return result;
  }
}
