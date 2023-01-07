import { AppError } from "@errors/AppError";
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { UsersTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory";
import { DayJsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayJsDateProvider";
import { MailProviderInMemory } from "@shared/container/providers/MailProvider/in-memory/MailProviderInMemory";

import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase";

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let userRepositoryInMemory: UsersRepositoryInMemory;
let mailProviderInMemory: MailProviderInMemory;
let dayJsDateProvider: DayJsDateProvider;

describe("SendForgotPasswordMailUseCase", () => {
  beforeEach(() => {
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
    userRepositoryInMemory = new UsersRepositoryInMemory();
    mailProviderInMemory = new MailProviderInMemory();
    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      userRepositoryInMemory,
      dayJsDateProvider,
      usersTokensRepositoryInMemory,
      mailProviderInMemory
    );
  });

  it("should be able to send a forgot password mail to user", async () => {
    const sendMail = jest.spyOn(mailProviderInMemory, "sendEmail");

    await userRepositoryInMemory.create({
      driver_license: "409027",
      email: "usatazip@otki.nc",
      name: "Donald Hernandez",
      password: "1234",
    });

    await sendForgotPasswordMailUseCase.execute("usatazip@otki.nc");

    expect(sendMail).toHaveBeenCalled();
  });

  it("should not be able to send an email if user does not exists", async () => {
    await expect(sendForgotPasswordMailUseCase.execute("he@eb.rw")).rejects.toEqual(
      new AppError("User does not exist !")
    );
  });

  it("should be able to create an users tokens", async () => {
    const generateTokenMail = jest.spyOn(usersTokensRepositoryInMemory, "create");

    userRepositoryInMemory.create({
      driver_license: "52972956",
      email: "fuzuh@rekvi.ng",
      name: "Bessie Lowe",
      password: "4321",
    });

    await sendForgotPasswordMailUseCase.execute("fuzuh@rekvi.ng");

    expect(generateTokenMail).toHaveBeenCalled();
  });
});
