import { CustomError } from "../error/CustomError";

export enum UserRole {
  NORMAL = "NORMAL",
  ADMIN = "ADMIN"
}

export class User {
  constructor(
    private id: string,
    private name: string,
    private nickname: string,
    private email: string,
    private password: string,
    private role: UserRole
  ) {}

  public getId(): string {
    return this.id;
  }
  public getName(): string {
    return this.name;
  }
  public getNickname(): string {
    return this.nickname;
  }
  public getEmail(): string {
    return this.email;
  }
  public getPassword(): string {
    return this.password;
  }
  public getRole(): UserRole {
    return this.role;
  }

  static stringToUseRole(input: string): UserRole {
    switch (input) {
      case "NORMAL":
        return UserRole.NORMAL;
      case "ADMIN":
        return UserRole.ADMIN;
      default:
        throw new CustomError(422, "Invalid user role");
    }
  }

  static toUserModel(user: any): User {
    return new User(
      user.id,
      user.name,
      user.nickname,
      user.email,
      user.password,
      User.stringToUseRole(user.role)
    );
  }
}

export interface UserRegisterDTO {
  name: string;
  nickname: string;
  email: string;
  password: string;
  role: string;
}

export interface UserLoginDTO {
  email?: any,
  nickname?: any,
  password: string
}

