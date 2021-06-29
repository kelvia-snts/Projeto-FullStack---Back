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
    ){}

    async createMusic(input: MusicCreation, token: string){
      const tokenData = this.authenticator.getData(token)

      if(!tokenData){
        throw new UnauthorizedError("Unauthorized")
      }
      if(!input.title || !input.author || !input.date || !input.file || !input.genre || !input.album){
        throw new InvalidInputError("Invalid input to create music")
      }

      await this.musicDatabase.createMusic(
        Music.toMusicModel({
          ...input,
          id: this.idGenerator.generate()
        })!
      )
    }

    /* async getMusicById(inout: string):  */
}