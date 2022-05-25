import { Router, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from 'config';

import { TLoginForm } from '../../types/auth';
import User from '../../models/User';

const authRouter = Router();

authRouter.post(
  '/',
  [
    body('email', 'Invalid credentials.').notEmpty().isEmail(),
    body(['email', 'password'], 'Invalid credentials.').notEmpty(),
  ],
  async (req: Request, res: Response) => {
    const err = validationResult(req);
    if (!err.isEmpty()) {
      return res.status(400).json({
        errors: err.array(),
      });
    }

    try {
      const { email, password } = req.body as TLoginForm;
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ errors: [{ msg: `Invalid crendentials.` }] });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ errors: [{ msg: 'Invalid Credentials.' }] });
      }

      const token = jwt.sign({ id: user._id as string, email: user.email }, config.get('jwtSecret'), {
        expiresIn: '10h',
        algorithm: 'HS512',
      });

      res.status(200).json({ token });
    } catch (e) {
      console.error(e);
    }
  },
);

export default authRouter;
