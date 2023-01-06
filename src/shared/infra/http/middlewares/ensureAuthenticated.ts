import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import auth from "@config/auth";
import { AppError } from "@errors/AppError";
import { UsersTokensRepository } from "@modules/accounts/infra/typeorm/repositories/UsersTokensRepository";

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;

  const usersTokensRepository = new UsersTokensRepository();

  if (!authHeader) {
    throw new AppError("Token missing", 401);
  }

  const [, token] = authHeader.split(" ");

  try {
    const { sub: userId } = verify(token, auth.secret_refresh_token) as IPayload;

    const user = await usersTokensRepository.findByUserIdAndRefreshToken(userId, token);

    if (!user) {
      throw new AppError("User does not exists", 401);
    }

    request.user = {
      id: userId,
    };

    next();
  } catch {
    throw new AppError("Invalid token", 401);
  }
}
