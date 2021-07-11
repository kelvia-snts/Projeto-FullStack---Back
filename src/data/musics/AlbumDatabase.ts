import { Album } from "../../model/Album";
import { BaseDatabase } from "../BaseDatabase";

export class AlbumDatabase extends BaseDatabase {
  private static TABLE_NAME = "Album";

  public async createAlbum(album: Album): Promise<void> {
    try {
      await this.getConnection()
        .insert({
          id: album.getId(),
          user_id: album.getUserId(),
          name: album.getName(),
        })
        .into(this.tableNames.albums);
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  public async getUserAlbums(id: string): Promise<Album> {
    const albums: any = await this.getConnection()
      .select("name", "id")
      .from(AlbumDatabase.TABLE_NAME)
      .where({ user_id: id });

    return albums;
  }
}
