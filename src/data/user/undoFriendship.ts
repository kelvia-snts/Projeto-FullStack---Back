import { Friendship } from "../../model/Friendship";
import { BaseDatabase } from "../BaseDatabase";

export class UndoFriendshipDatabase extends BaseDatabase {
  private static TABLE_NAME = "Music_follow";

  public async unfollow(unfollow: Friendship): Promise<void> {
    try {
      await this.getConnection()
        .delete()
        .into(this.tableNames.follow)
        .where({ followed: unfollow.getFollowed() });
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }
}
