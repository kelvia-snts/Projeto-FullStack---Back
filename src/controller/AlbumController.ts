import { Request, Response } from "express";
import { AlbumDatabase } from "../data/AlbumDatabase";
import { AlbumLogic } from "../logic/AlbumLogic";
import { AlbumDTO } from "../model/Album";
import { Authenticator } from "../services/Authenticator";
import { IdGenerator } from "../services/IdGenerator";

export class AlbumController {
  async createAlbum(req: Request, res: Response) {
    try {
      const input: AlbumDTO = {
        name: req.body.name
      }
      const token = req.headers.authorization as string
      const albumLogic = new AlbumLogic(
        new AlbumDatabase(),
        new IdGenerator(),
        new Authenticator()
      );
    } catch (error) {
      
    }
  }
}