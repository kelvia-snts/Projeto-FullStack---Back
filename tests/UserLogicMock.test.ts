import { UserDatabase } from "../src/data/UserDatabase";
import { UserLogic } from "../src/logic/UserLogic";
import { UserRegisterDTO } from "../src/model/User";
import { AuthenticatorMock } from "./mocks/AuthenticatorMock";
import { HashManagerMock } from "./mocks/HashManagerMock";
import { IdGeneratorMock } from "./mocks/IdGeneratorMock";
import { UserDatabaseMock } from "./mocks/userDatabaseMock";

export class UserLogicMock {
  constructor(
    private userDatabase: UserDatabaseMock,
    private idGenerator: IdGeneratorMock,
    private hashManager: HashManagerMock,
    private authenticator: AuthenticatorMock
  ) {}

  /* 
  describe("UserBusiness", () => {
    describe("signup", () => {
      test("Should catch error when name is empty", async () => {
        expect.assertions(2);
        
        const user = {
          name: "",
          nickname: "bb",
          email: "bb@gmail.com",
          password: "12456",
          role: "NORMAL"
        } as UserRegisterDTO
        
        try {
          await UserLogicMock.registerUser(user)
        } catch (error) {
          expect(error.statusCode).toBe(422);
          expect(error.message).toBe("Missing input");
        }
      })
    })
  })

 */
}