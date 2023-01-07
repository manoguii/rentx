import { ICreateUserTokenDTO } from "@modules/accounts/dtos/ICreateUserTokenDTO";
import { UserToken } from "@modules/accounts/infra/typeorm/entities/UserToken";

import { IUsersTokensRepository } from "../IUsersTokensRepository";

class UsersTokensRepositoryInMemory implements IUsersTokensRepository {
  private usersTokens: UserToken[] = [];

  async create({
    expires_date,
    refresh_token,
    user_id,
  }: ICreateUserTokenDTO): Promise<UserToken> {
    const userToken = new UserToken();

    Object.assign(userToken, {
      expires_date,
      user_id,
      refresh_token,
    });

    this.usersTokens.push(userToken);

    return userToken;
  }

  async findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string
  ): Promise<UserToken> {
    const userTokens = this.usersTokens.find(
      (userToken) =>
        userToken.user_id === user_id && userToken.refresh_token && refresh_token
    );

    return userTokens;
  }

  async deleteById(id: string): Promise<void> {
    const userToken = this.usersTokens.find((user) => user.id === id);

    this.usersTokens.splice(this.usersTokens.indexOf(userToken));
  }

  async findByRefreshToken(refresh_token: string): Promise<UserToken> {
    const userTokens = this.usersTokens.find(
      (userToken) => userToken.refresh_token === refresh_token
    );

    return userTokens;
  }
}

export { UsersTokensRepositoryInMemory };