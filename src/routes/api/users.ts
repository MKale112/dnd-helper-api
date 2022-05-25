import express, { Request, Response, Router } from 'express';
import { body, validationResult } from 'express-validator';
import { authorize } from '../../middleware/authorize';
import bcrypt from 'bcryptjs';
import gravatar from 'gravatar';
import jwt from 'jsonwebtoken';
import config from 'config';

import User, { TUser } from '../../models/User';

interface UserInput {
  name: string;
  email: string;
  password: string;
  gender: string;
}

const usersRouter = Router();

// @route       GET api/auth
// @desc        Load user / Get a user
// @access      PUBLIC
usersRouter.get('/', authorize, async (req: Request, res: Response) => {
  const { id } = req.body.locals;

  if (!id) {
    res.status(401).json({ error: { msg: 'Unauthorized.' } });
  }

  try {
    const user = await User.findById(id, 'id name email avatar characters');
    console.log('[BE] getUser:', user?.id);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json('Server Error');
  }
});

// @route       POST api/auth
// @desc        Registering a new user
// @access      PUBLIC
usersRouter.post(
  '/',
  [
    body(['name', 'email', 'password'], 'You forgot to fill some fields!').notEmpty(),
    body('email', 'You must submit a valid email.').isEmail(),
    body('password', 'A password must be between 6 and 20 characters in length.').isLength({ min: 6, max: 20 }),
  ],
  async (req: express.Request, res: express.Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password, gender } = req.body as UserInput;

    try {
      const checkUser = await User.findOne({ email });
      if (checkUser) {
        return res.status(400).json({ errors: [{ msg: 'Invalid credentials.' }] });
      }

      // GRAVATAR
      const avatar = gravatar.url(email, {
        size: '200px',
        d: 'mp',
        r: 'pg',
      });

      const newUser = new User({
        name,
        email,
        password,
        gender,
        avatar,
      });

      const salt = await bcrypt.genSalt(10);
      const hash: string = await bcrypt.hash(newUser.password, salt);
      newUser.password = hash;

      const result = await newUser.save();

      const token = jwt.sign(
        {
          id: result.id,
          email: result.email,
          avatar: result.avatar,
        },
        config.get('jwtSecret'),
        { expiresIn: '10h', algorithm: 'HS512' },
      );

      res.json({ token });
    } catch (err) {
      console.error(err);
    }
  },
);

export default usersRouter;
