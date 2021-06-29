import { Music } from "../model/Music";
import { BaseDatabase } from "./BaseDatabase";

export class MusicDatabase extends BaseDatabase {
  private static TABLE_NAME = "Musics"

  public async createMusic(music: Music): Promise<void> {
    try {
      await this.getConnection()
      .insert({
        id: music.getId(),
        title: music.getTitle(),
        author: music.getAuthor(),
        date: music.getDate(),
        file: music.getFile(),
        genre: music.getGenre(),
        album: music.getAlbum()
      })
      .into(MusicDatabase.TABLE_NAME)
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

}