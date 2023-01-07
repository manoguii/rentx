import { AppError } from "@errors/AppError";
import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { UsersTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory";
import { DayJsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayJsDateProvider";

import { UserUseCase } from "../CreateUser/UserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

let usersRepositoryInMemory: UsersRepositoryInMemory;
let authenticateUserUseCase: AuthenticateUserUseCase;
let createUserUseCase: UserUseCase;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let dayJsDateProvider: DayJsDateProvider;

describe("Authenticate User", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    createUserUseCase = new UserUseCase(usersRepositoryInMemory);
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
    dayJsDateProvider = new DayJsDateProvider();

    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepositoryInMemory,
      dayJsDateProvider,
      usersTokensRepositoryInMemory
    );
  });

  it("should be able to authenticate user", async () => {
    const user: ICreateUserDTO = {
      driver_license: "ABC123",
      email: "email@email.com",
      password: "password",
      name: "John Doe",
    };

    await createUserUseCase.execute(user);

    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });

    expect(result).toHaveProperty("token");
  });

  it("should not be able to authenticate an nonexistent user", async () => {
    await expect(
      authenticateUserUseCase.execute({
        email: "nonexistent@email.com",
        password: "password",
      })
    ).rejects.toEqual(new AppError("Email or password incorrect"));
  });

  it("should not be able to authenticate wifh incorrect password", async () => {
    const user: ICreateUserDTO = {
      driver_license: "ABC123",
      email: "email@email.com",
      password: "password",
      name: "John Doe",
    };

    await createUserUseCase.execute(user);

    await expect(
      authenticateUserUseCase.execute({
        email: user.email,
        password: "incorrect password",
      })
    ).rejects.toEqual(new AppError("Email or password incorrect"));
  });
});
