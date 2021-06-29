import { Request, Response } from "express";
import { BaseDatabase } from "../data/BaseDatabase";
import { MusicDatabase } from "../data/MusicDatabase";
import { MusicLogic } from "../logic/MusicLogic";
import { MusicCreation } from "../model/Music";
import { Authenticator } from "../services/Authenticator";
import { IdGenerator } from "../services/IdGenerator";

export class MusicController {
  async createMusic(req: Request, res: Response) {
    try {
      const input: MusicCreation = {
        title: req.body.name,
        file: req.body.file,
        genreId: req.body.genreId,
        album: req.body.album,
      };

      const musicLogic = new MusicLogic(
        new MusicDatabase(),
        new IdGenerator(),
        new Authenticator()
      );

      await musicLogic.createMusic(input, req.headers.authorization as string);
      res.sendStatus(200);
    } catch (error) {
      res.status(error.customErrorCode || 400).send({
        message: error.message,
      });
    } finally {
      await BaseDatabase.destroyConnection();
    }
  }

  async getMusicDetail(req: Request, res: Response) {
    try {
      const input = req.query.id as string;
      const musicLogic = new MusicLogic(
        new MusicDatabase(),
        new IdGenerator(),
        new Authenticator()
      );
      const music = await musicLogic.getMusicById(input);
      res.status(200).send(music);
    } catch (error) {
      res.status(error.customErrorCode || 400).send({
        message: error.message,
      });
    } finally {
      await BaseDatabase.destroyConnection();
    }
  }
}
