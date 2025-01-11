import { Router } from 'express';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../utils/validateBody.js';

import {
  loginUserController,
  logoutUserController,
  refreshUsersSessionController,
  registerUserController,
} from '../controllers/auth.js';
import { loginUserSchema, registerUserSchema } from '../validation/auth.js';

export const usersRouter = Router();

usersRouter.post(
  '/register',
  validateBody(registerUserSchema),
  ctrlWrapper(registerUserController),
);

usersRouter.post(
  '/login',
  validateBody(loginUserSchema),
  ctrlWrapper(loginUserController),
);

usersRouter.post('/refresh', ctrlWrapper(refreshUsersSessionController));

usersRouter.post('/logout', ctrlWrapper(logoutUserController));

export default usersRouter;