import { User } from "../../src/model/User";
import { userMockAdmin, userMockNormal } from "./userMock";

export class UserDatabaseMock {
  public async registerUser(user: User) : Promise<void> {}

  public async getUserByEmail(email: string) : Promise<User  | undefined>{
    switch (email) {
      case "astrodev@gmail.com":
        return userMockAdmin
      case "bananinha@gmail.com":
        return userMockNormal
      default:
        return undefined
    }
  }

  public async getUserByNickname(nickname: string) : Promise<User  | undefined>{
    switch (nickname) {
      case "dev":
        return userMockAdmin
      case "nana":
        return userMockNormal
      default:
        return undefined
    }
  }
}