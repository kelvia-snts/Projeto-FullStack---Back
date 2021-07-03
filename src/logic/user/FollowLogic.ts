import { FriendshipDatabase } from "../../data/user/FriendshipDatabase";
import { CustomError } from "../../error/CustomError";
import { InvalidInputError } from "../../error/InvalidInputError";
import { UnauthorizedError } from "../../error/UnauthorizedError";
import { Friendship, FriendshipDTO } from "../../model/Friendship";
import { Authenticator } from "../../services/Authenticator";

export class FollowLogic {
  constructor(
    private followDatabase: FriendshipDatabase,
    private authenticator: Authenticator
  ) {}

  async follow(friendship: FriendshipDTO, token: string) {
    try {
      if (!friendship.followed) {
        throw new InvalidInputError("Invalid input to create music");
      }
      const tokenData = this.authenticator.getData(token);
      if (!tokenData) {
        throw new UnauthorizedError("Unauthorized");
      }
      const follower_id = tokenData.id;

      await this.followDatabase.follow(
        Friendship.toFollowModel({
          ...friendship,
          follower: follower_id,
        })
      );
    } catch (error) {
      throw new CustomError(error.statusCode, error.message);
    }
  }
}
