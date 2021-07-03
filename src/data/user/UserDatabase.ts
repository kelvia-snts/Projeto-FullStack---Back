import { User } from "../../model/User";
import { BaseDatabase } from "../BaseDatabase";

export class UserDatabase extends BaseDatabase {
  private static TABLE_NAME = "Listeners";

  public async registerUser(user: User): Promise<void> {
    try {
      await this.getConnection()
        .insert({
          id: user.getId(),
          name: user.getName(),
          nickname: user.getNickname(),
          email: user.getEmail(),
          password: user.getPassword(),
          role: user.getRole(),
        })
        .into(this.tableNames.users);
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  public async getUserByEmail(email: string): Promise<User> {
    const result = await this.getConnection()
      .select("*")
      .from(UserDatabase.TABLE_NAME)
      .where({ email });

    return User.toUserModel(result[0]);
  }

  public async getUserByNickname(nickname: string): Promise<User> {
    const result = await this.getConnection()
      .select("*")
      .from(UserDatabase.TABLE_NAME)
      .where({ nickname });

    return User.toUserModel(result[0]);
  }
}
