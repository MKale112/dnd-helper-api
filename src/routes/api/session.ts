import express, { Request, Response, Router } from 'express';
import { getCharsForSession } from '../../controllers/session';
import { authorize } from '../../middleware/authorize';

const sessionRouter = Router();

// @ROUTE       GET /api/session/:id
// @DESC        gets all characters for the session
// @ACCESS      private
sessionRouter.get('/:id', authorize, (req: Request, res: Response) => {
  getCharsForSession(req, res);
});

export default sessionRouter;
