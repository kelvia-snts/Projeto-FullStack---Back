import { NotFoundError } from "../../error/NotFoundError";
import { Music } from "../../model/Music";
import { BaseDatabase } from "../BaseDatabase";

export class MusicDatabase extends BaseDatabase {
  private static TABLE_NAME = "Musics";

  public async createMusic(music: Music): Promise<void> {
    try {
      await this.getConnection()
        .insert({
          id: music.getId(),
          title: music.getTitle(),
          author_id: music.getAuthorId(),
          date: music.getDate(),
          file: music.getFile(),
          genre_id: music.getGenreId(),
          album_id: music.getAlbumId(),
        })
        .into(this.tableNames.musics);
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  public async getUserMusics(id: string): Promise<Music> {
    const musics: any = await this.getConnection().raw(`
    SELECT m.title, m.file, DATE_FORMAT(m.date, '%d/%m/%Y' ) as date, l.name as user, g.name as genre
    FROM Musics m 
    INNER JOIN Listeners l ON m.author_id = l.id
    INNER JOIN Genre g ON m.genre_id = g.id
    WHERE author_id = '${id}'
    `);
    return musics[0];
  }

  public async getMusics(): Promise<Music> {
    const result: any = await this.getConnection().raw(`
    SELECT m.title, m.file, DATE_FORMAT(m.date, '%d/%m/%Y' ) as date, l.name as user, g.name as genre
    FROM Musics m 
    INNER JOIN Listeners l ON m.author_id = l.id
    INNER JOIN Genre g ON m.genre_id = g.id
    `);

    return result[0];
  }

  public async getMusicByIdOrFail(id: string): Promise<Music> {
    const music = await this.getConnection()
      .select("*")
      .from(MusicDatabase.TABLE_NAME)
      .where({ id: id });
    if (!music[0]) {
      throw new NotFoundError(`Unable to found músic with input: ${id}`);
    }
    return Music.toMusicModel(music[0])!;
  }

  public async deleteMusic(id: string): Promise<void> {
    try {
      await this.getConnection()
        .delete()
        .into(this.tableNames.musics)
        .where({ id: id });
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }
}
