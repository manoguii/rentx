import dayjs from "dayjs";
import { resolve } from "path";
import { inject, injectable } from "tsyringe";
import { v4 as uuidV4 } from "uuid";

import { AppError } from "@errors/AppError";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { IMailProvider } from "@shared/container/providers/MailProvider/IMailProvider";

@injectable()
class SendForgotPasswordMailUseCase {
  constructor(
    @inject("UsersRepository")
    private userRepository: IUsersRepository,

    @inject("DayJsDateProvider")
    private dateProvider: IDateProvider,

    @inject("UsersTokensRepository")
    private usersTokensRepository: IUsersTokensRepository,

    @inject("EtherealMailProvider")
    private mailProvider: IMailProvider
  ) {}

  async execute(email: string) {
    const user = await this.userRepository.findByEmail(email);

    const templatePath = resolve(
      __dirname,
      "..",
      "..",
      "views",
      "emails",
      "ForgotPassword.hbs"
    );

    if (!user) {
      throw new AppError("User does not exist !");
    }

    const token = uuidV4();

    const expires_date = dayjs().add(3, "hours").toDate();

    await this.usersTokensRepository.create({
      refresh_token: token,
      user_id: user.id,
      expires_date,
    });

    const variables = {
      name: user.name,
      link: `${process.env.FORGOT_EMAIL_URL}${token}`,
    };

    await this.mailProvider.sendEmail(
      email,
      "Recuperarção de senha",
      variables,
      templatePath
    );
  }
}

export { SendForgotPasswordMailUseCase };
