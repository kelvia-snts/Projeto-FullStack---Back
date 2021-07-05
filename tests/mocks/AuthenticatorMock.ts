import * as jwt from "jsonwebtoken";
import { UserRole } from "../../src/model/User";

export class AuthenticatorMock {
  public generateToken(
    input: AuthenticationData,
    expiresIn: string = process.env.ACCESS_TOKEN_EXPIRES_IN!
  ): string { return "token_Mock"}

  public getData(token: string): AuthenticationData {
    return {
      id: "id_mock",
      role: UserRole.NORMAL
    }
  }
}

interface AuthenticationData {
  id: string;
  role?: string;
}
