import express, { Request, Response, Router } from 'express';
import { addCharacter } from '../../controllers/characters';
import { authorize } from '../../middleware/authorize';
// import {check, validationResult} from "express-validator";

const characterRouter = Router();

// @route       GET api/characters
// @desc        Get all user's characters
// @access      PRIVATE
// characterRouter.get('/', authorize, async (req: Request, res: Response) => {
//   getCharacters(req, res);
// });

// @route       POST api/characters
// @desc        Create and store a user's character
// @access      PRIVATE
characterRouter.post('/', authorize, (req: Request, res: Response) => {
  addCharacter(req, res);
});

export default characterRouter;
