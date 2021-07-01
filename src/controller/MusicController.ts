import { Request, Response } from "express";
import { BaseDatabase } from "../data/BaseDatabase";
import { MusicDatabase } from "../data/MusicDatabase";
import { MusicLogic } from "../logic/MusicLogic";
import { MusicCreationDTO } from "../model/Music";
import { Authenticator } from "../services/Authenticator";
import { IdGenerator } from "../services/IdGenerator";

export class MusicController {
  async createMusic(req: Request, res: Response) {
    try {
      const input: MusicCreationDTO = {
        title: req.body.title,
        file: req.body.file,
        genre_id: req.body.genre_id,
        album: req.body.album,
      };
      const token = req.headers.authorization as string
      const musicLogic = new MusicLogic(
        new MusicDatabase(),
        new IdGenerator(),
        new Authenticator()
      );
        
      const result = await musicLogic.createMusic(input, token);
      res.status(200).send("Music created successfully");
    } catch (error) {
      res.status(error.customErrorCode || 400).send({
        message: error.message
      });
    }
    await BaseDatabase.destroyConnection();
  }

  async getAllMusics(req: Request, res: Response) {
    try {
      const token = req.headers.authorization as string;
      const musicLogic = new MusicLogic(
        new MusicDatabase(),
        new IdGenerator(),
        new Authenticator()
      );
      const musics = await musicLogic.getAllMusics(token);
      res.status(200).send(musics);
    } catch (error) {
      res.status(error.customErrorCode || 400).send({
        message: error.message,
      });
    } 
  }

  async getMusicDetail(req: Request, res: Response) {
    try {
      const {id} = req.params
      const token = req.headers.authorization as string
      const musicLogic = new MusicLogic(
        new MusicDatabase(),
        new IdGenerator(),
        new Authenticator()
      );
      const music = await musicLogic.getMusicById(id, token );
      res.status(200).send(music);
    } catch (error) {
      res.status(error.customErrorCode || 400).send({
        message: error.message,
      });
    } 
  }
}
