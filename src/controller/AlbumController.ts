import { Request, Response } from "express";
import { AlbumDatabase } from "../data/AlbumDatabase";
import { BaseDatabase } from "../data/BaseDatabase";
import { AlbumLogic } from "../logic/AlbumLogic";
import { AlbumDTO } from "../model/Album";
import { Authenticator } from "../services/Authenticator";
import { IdGenerator } from "../services/IdGenerator";

export class AlbumController {
  async createAlbum(req: Request, res: Response) {
    try {
      const input: AlbumDTO = {
        name: req.body.name,
      };
      const token = req.headers.authorization as string;
      const albumLogic = new AlbumLogic(
        new AlbumDatabase(),
        new IdGenerator(),
        new Authenticator()
      );
      const result = await albumLogic.createAlbum(input, token);
      res.status(200).send("Album created successfully");
    } catch (error) {
      res.status(error.customErrorCode || 400).send({
        message: error.message,
      });
    }
    await BaseDatabase.destroyConnection();
  }

  async getUserAlbums(req: Request, res: Response) {
    try {
      const token = req.headers.authorization as string;
      const albumLogic = new AlbumLogic(
        new AlbumDatabase(),
        new IdGenerator(),
        new Authenticator()
      );
      const albums = await albumLogic.getUserAlbums(token);
      res.status(200).send(albums);
    } catch (error) {
      res.status(error.customErrorCode || 400).send({
        message: error.message,
      });
    }
  }
}
