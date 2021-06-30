import { NotFoundError } from "../src/error/NotFoundError";
import { UserLogic } from "../src/logic/UserLogic";
import { User, UserRegisterDTO } from "../src/model/User";

const userDatabase = {
  registerUser: jest.fn(async (user: User) => {}),
  getUserByEmail: jest.fn((email: string) => {
    if (email === "teste@email.com") {
      return User.toUserModel({
        id: "user_id",
        name: "user_name",
        nickname: "user_nickname",
        email,
        password: "123456",
        role: "ADMIN",
      });
    } else {
      throw new NotFoundError(`Unable to found user with email: ${email}`);
    }
  }),
};
const authenticator = {
  generateToken: jest.fn(
    (payload: { id: string; role: string }) => "token_blabla"
  ),
  getData: jest.fn((token: string) => {
    switch (token) {
      case "userToken":
        return { id: "id_do_token", role: "NORMAL" };
      case "adminToken":
        return { id: "id_do_token", role: "ADMIN" };
      default:
        return undefined;
    }
  }),
};

const idGenerator = {
  generate: jest.fn(() => "eu_amo_backend")
}

const hashManager = {
  hash: jest.fn((password: string) => "SECRET_PASS_HASH"),
  compare: jest.fn((text: string, hash: string) => text === "123123" ? true : false)
}

const userBusiness = new UserLogic(
  userDatabase as any,
  idGenerator as any,
  hashManager as any,
  authenticator as any
)

describe("UserLogic", () => {
  describe("register", () => {
    test("Should catch error when name is empty", async () => {
      expect.assertions(2);

      const user = {
        name: "nome",
        nickname: "nick",
        email: "testemail.com",
        password: "123456",
        role: "NORMAL"
      } as UserRegisterDTO
      
      try {
        await userBusiness.registerUser(user)
      } catch (error) {
        expect(error.message).toBe("Invalid email format")
        expect(error.code).toBe(422)
      }
    })
    
  })
})