import { NotFoundError } from "../error/NotFoundError";
import { Music } from "../model/Music";
import { BaseDatabase } from "./BaseDatabase";

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
          album_id: music.getAlbumId()
        })
        .into(this.tableNames.musics);
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  public async getUserMusics(id: string): Promise<Music> {
    const musics: any = await this.getConnection()
      .select("*")
      .from(MusicDatabase.TABLE_NAME)
      .where({ author_id: id });

    return Music.toMusicModel(musics[0])!;
  }

  public async getMusics(): Promise<Music> {
    const result: any = await this.getConnection()
      .select("*")
      .from(MusicDatabase.TABLE_NAME)

      return result
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
}
