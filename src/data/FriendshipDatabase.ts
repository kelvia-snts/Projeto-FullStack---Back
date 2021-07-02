import { Friendship } from "../model/Friendship";
import { BaseDatabase } from "./BaseDatabase";

export class FriendshipDatabase extends BaseDatabase {
  private static TABLE_NAME = "Music_follow";

  public async follow(friends: Friendship): Promise<void> {
    try {
      await this.getConnection()
        .insert({
          follower: friends.getFollower(),
          followed: friends.getFollowed(),
        })
        .into(this.tableNames.follow);
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }
}
