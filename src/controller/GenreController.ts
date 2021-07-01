import { Request, Response } from "express";
import { BaseDatabase } from "../data/BaseDatabase";
import { GenreDatabase } from "../data/GenreDatabase";
import { GenreLogic } from "../logic/GenreLogic";
import { GenreDTO } from "../model/Genre";
import { Authenticator } from "../services/Authenticator";
import { IdGenerator } from "../services/IdGenerator";

export class GenreController {
  async createGenre(req: Request, res: Response) {
    try {
      const input: GenreDTO = {
        name: req.body.name
      }
      const token = req.headers.authorization as string
      const genreLogic = new GenreLogic(
        new GenreDatabase(),
        new IdGenerator(),
        new Authenticator()
      );
      const result = await genreLogic.createGenre(input, token)
      res.status(200).send("Genre created successfully");
    } catch (error) {
      res.status(error.customErrorCode || 400).send({message: error.message});
    }
    await BaseDatabase.destroyConnection();
  }

  async getAllGenres(req: Request, res: Response) {
    try {
      const token = req.headers.authorization as string;
      const genreLogic = new GenreLogic(
        new GenreDatabase(),
        new IdGenerator(),
        new Authenticator()
      );
      const genres = await genreLogic.getAllGenres(token)
      res.status(200).send(genres)
    } catch (error) {
      res.status(error.customErrorCode || 400).send({
        message: error.message,
      });
    }
  }
}