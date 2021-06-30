import { Request, Response } from "express";
import { BaseDatabase } from "../data/BaseDatabase";
import { UserDatabase } from "../data/UserDatabase";
import { UserLogic } from "../logic/UserLogic";
import { UserLoginDTO, UserRegisterDTO } from "../model/User";
import { Authenticator } from "../services/Authenticator";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";

export class UserController {
  async register(req: Request, res: Response) {
    try {
      const input: UserRegisterDTO = {
        name: req.body.name,
        nickname: req.body.nickname,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role
      };

      const userLogic = new UserLogic(
        new UserDatabase,
        new IdGenerator,
        new HashManager,
        new Authenticator
      );
      
      const token = await userLogic.registerUser(input);
      res.status(200).send({ token });
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
    await BaseDatabase.destroyConnection();
  }


  async login(req: Request, res: Response) {
    try {
      const loginData: UserLoginDTO = {
        login: req.body.login,
        password: req.body.password
      }

      const userLogic = new UserLogic(
        new UserDatabase,
        new IdGenerator,
        new HashManager,
        new Authenticator
      )

      const token = await userLogic.loginByEmailOrNickname(loginData);
      res.status(200).send({token})

    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  }
}
