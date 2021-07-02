import { Request, Response } from "express";
import { BaseDatabase } from "../data/BaseDatabase";
import { FriendshipDatabase } from "../data/FriendshipDatabase";
import { FollowLogic } from "../logic/FollowLogic";
import { FriendshipDTO } from "../model/Friendship";
import { Authenticator } from "../services/Authenticator";

export class FollowController {
  async follow(req: Request, res: Response) {
    try {
      const input: FriendshipDTO = {
        followed: req.body.followed,
      };
      const token = req.headers.authorization as string;
      const followLogic = new FollowLogic(
        new FriendshipDatabase(),
        new Authenticator()
      );

      const result = await followLogic.follow(input, token);
      res.status(200).send("OK");
    } catch (error) {
      res.status(error.customErrorCode || 400).send({
        message: error.message,
      });
    }
    await BaseDatabase.destroyConnection();
  }
}
