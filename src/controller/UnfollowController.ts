import { Request, Response } from "express";
import { BaseDatabase } from "../data/BaseDatabase";
import { UndoFriendshipDatabase } from "../data/undoFriendship";
import { UnfollowLogic } from "../logic/Unfollow";
import { FriendshipDTO } from "../model/Friendship";
import { Authenticator } from "../services/Authenticator";

export class UnfollowController {
  async unfollow(req: Request, res: Response) {
    try {
      const input: FriendshipDTO = {
        followed: req.body.followed,
      };
      const token = req.headers.authorization as string;
      const unfollowLogic = new UnfollowLogic(
        new UndoFriendshipDatabase(),
        new Authenticator()
      );

      const result = await unfollowLogic.unfollow(input, token);
      res.status(200).send("OK");
    } catch (error) {
      res.status(error.customErrorCode || 400).send({
        message: error.message,
      });
    }
    await BaseDatabase.destroyConnection();
  }
}
