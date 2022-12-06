import { Request, Response } from "express";
import { container } from "tsyringe";

import { UserUseCase } from "./UserUseCase";

class UserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, email, password, driver_license, username } = request.body;

    const createUserUseCase = container.resolve(UserUseCase);

    await createUserUseCase.execute({
      name,
      email,
      password,
      driver_license,
      username,
    });

    return response.status(201).send();
  }
}

export { UserController };
