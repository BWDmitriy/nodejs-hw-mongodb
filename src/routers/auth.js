// src/routers/auth.js

import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper';
import { registerUserSchema } from '../validation/auth';
import { registerUserController } from '../controllers/auth';
import { validateBody } from '../middlewares/validation';

const authRouter = Router();

authRouter.post(
  '/register',
  validateBody(registerUserSchema),
  ctrlWrapper(registerUserController),
);

export default authRouter;
