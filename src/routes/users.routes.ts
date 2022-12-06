import { Router } from "express";

import { UserController } from "../modules/accounts/useCases/CreateUser/UserController";

const usersRouter = Router();

const createUserController = new UserController();

usersRouter.post("/", createUserController.handle);

export { usersRouter };
