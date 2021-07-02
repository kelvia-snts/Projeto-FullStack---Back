import { UndoFriendshipDatabase } from "../data/undoFriendship";
import { CustomError } from "../error/CustomError";
import { InvalidInputError } from "../error/InvalidInputError";
import { UnauthorizedError } from "../error/UnauthorizedError";
import { Friendship, FriendshipDTO } from "../model/Friendship";
import { Authenticator } from "../services/Authenticator";

export class UnfollowLogic {
  constructor(
    private unfollowDatabase: UndoFriendshipDatabase,
    private authenticator: Authenticator
  ) {}

  async unfollow(undoFriendship: FriendshipDTO, token: string) {
    try {
      if (!undoFriendship.followed) {
        throw new InvalidInputError("Invalid input to create music");
      }
      const tokenData = this.authenticator.getData(token);
      if (!tokenData) {
        throw new UnauthorizedError("Unauthorized");
      }
      const follower_id = tokenData.id;

      await this.unfollowDatabase.unfollow(
        Friendship.toFollowModel({
          ...undoFriendship,
          follower: follower_id,
        })
      );
    } catch (error) {
      throw new CustomError(error.statusCode, error.message);
    }
  }
}
