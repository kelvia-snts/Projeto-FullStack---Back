import { AlbumDatabase } from "../data/AlbumDatabase";
import { CustomError } from "../error/CustomError";
import { InvalidInputError } from "../error/InvalidInputError";
import { NotFoundError } from "../error/NotFoundError";
import { UnauthorizedError } from "../error/UnauthorizedError";
import { Album, AlbumDTO } from "../model/Album";
import { Authenticator } from "../services/Authenticator";
import { IdGenerator } from "../services/IdGenerator";

export class AlbumLogic {
  constructor(
    private albumDatabase: AlbumDatabase,
    private idGenerator: IdGenerator,
    private authenticator: Authenticator
  ) {}

  async createAlbum(album: AlbumDTO, token: string) {
    try {
      if(!album.name){
        throw new InvalidInputError("Invalid input to create music");
      }
      const tokenData = this.authenticator.getData(token);
      if (!tokenData) {
        throw new UnauthorizedError("Unauthorized");
      }
      const albumId = this.idGenerator.generate();
      const userId = tokenData.id;

      await this.albumDatabase.createAlbum(
        Album.toAlbumModel({
          ...album,
          id: albumId,
          user_id: userId
        })!
      )
    } catch (error) {
      throw new CustomError(error.statusCode, error.message);
    }
  }

  async getUserAlbums(id:string, token: string): Promise<Album> {
    const tokenData = this.authenticator.getData(token);
    const userId = tokenData.id;
    const albums = await this.albumDatabase.getUserAlbums(userId)
    if(!tokenData){
      throw new UnauthorizedError("Unauthorized");
    }
    return albums
  }
}