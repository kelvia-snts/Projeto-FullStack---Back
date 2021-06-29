import { NotFoundError } from "../error/NotFoundError";
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
        genre: music.getGenreId(),
        album: music.getAlbum()
      })
      .into(MusicDatabase.TABLE_NAME)
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }
  public async getMusicByIdOrFail(input: string): Promise<Music> {
    const music = await this.getConnection()
    .select("*")
    .from(MusicDatabase.TABLE_NAME)
    .where({id: input})
    if(!music[0]){
      throw new NotFoundError(`Unable to found Band with input: ${input}`)
    }
    return Music.toMusicModel(music[0])!
  }


}