import { UserDatabase } from "../../data/user/UserDatabase";
import { CustomError } from "../../error/CustomError";
import { InvalidInputError } from "../../error/InvalidInputError";
import { User, UserLoginDTO, UserRegisterDTO } from "../../model/User";
import { Authenticator } from "../../services/Authenticator";
import { HashManager } from "../../services/HashManager";
import { IdGenerator } from "../../services/IdGenerator";

export class UserLogic {
  constructor(
    private userDatabase: UserDatabase,
    private idGenerator: IdGenerator,
    private hashManager: HashManager,
    private authenticator: Authenticator
  ) {}

  async registerUser(user: UserRegisterDTO) {
    try {
      if (
        !user.email ||
        !user.name ||
        !user.nickname ||
        !user.password ||
        !user.role
      ) {
        throw new InvalidInputError("Invalid data to register");
      }
      if (user.email.indexOf("@") === -1) {
        throw new InvalidInputError("Invalid email format");
      }
      if (user.password && user.password.length < 6) {
        throw new InvalidInputError("Password should have more than 6 digits");
      }

      const UserId = this.idGenerator.generate();
      const hashPassword = await this.hashManager.hash(user.password);

      await this.userDatabase.registerUser(
        User.toUserModel({
          ...user,
          id: UserId,
          password: hashPassword,
        })
      );
      const accessToken = this.authenticator.generateToken({
        id: UserId,
        role: user.role,
      });
      return accessToken;
    } catch (error) {
      if (error.message.includes(" key 'email' ")) {
        throw new CustomError(
          409,
          "Email already belongs to an active account"
        );
      }
      if (error.message.includes(" key 'nickname' ")) {
        throw new CustomError(
          409,
          "Nickname already belongs to an active account"
        );
      }

      throw new CustomError(error.statusCode, error.message);
    }
  }

  async loginByEmailOrNickname(user: UserLoginDTO) {
    if (!user.login || !user.password) {
      throw new InvalidInputError("Invalid data to login");
    }
    const isEmail = user.login.includes("@");

    const existingUser = isEmail
      ? await this.userDatabase.getUserByEmail(user.login)
      : await this.userDatabase.getUserByNickname(user.login);

    const hashCompare = await this.hashManager.compare(
      user.password,
      existingUser.getPassword()
    );
    if (!existingUser || !hashCompare) {
      throw new CustomError(401, "Invalid credentials");
    }

    const accessToken = this.authenticator.generateToken({
      id: existingUser.getId(),
      role: existingUser.getRole(),
    });
    return accessToken;
  }
}
