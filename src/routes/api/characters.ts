import express, { Request, Response, Router } from 'express';
import { addCharacter, getCharacters, deleteCharacter, updateCharacter } from '../../controllers/characters';
import { authorize } from '../../middleware/authorize';

const characterRouter = Router();

// @route       GET api/characters
// @desc        Get all user's characters
// @access      PRIVATE
characterRouter.get('/', authorize, async (req: Request, res: Response) => {
  getCharacters(req, res);
});

// @route       POST api/characters
// @desc        Create and store a user's character
// @access      PRIVATE
characterRouter.post('/', authorize, (req: Request, res: Response) => {
  addCharacter(req, res);
});

// @route       DELETE api/characters/:id
// @desc        Deletes a character from the DB
// @access      PRIVATE
characterRouter.delete('/:id', authorize, (req: Request, res: Response) => {
  deleteCharacter(req, res);
});

// @route       PUT api/characters/:id;
// @desc        Update character sheet and info
// @access      PRIVATE
characterRouter.put('/:id', authorize, (req: Request, res: Response) => {
  updateCharacter(req, res);
});

export default characterRouter;
