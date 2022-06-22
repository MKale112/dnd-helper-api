import express, { Request, Response, Router } from 'express';
import { addCampaign, deleteCampaign, getCampaigns, updateCampaign } from '../../controllers/campaigns';
import { authorize } from '../../middleware/authorize';

const campaignRouter = Router();

// @route       GET api/campaigns
// @desc        Get all user's Campaigns
// @access      PRIVATE
campaignRouter.get('/', authorize, (req: Request, res: Response) => {
  getCampaigns(req, res);
});

// @route       POST api/campaigns
// @desc        Create and store a user's Campaign
// @access      PRIVATE
campaignRouter.post('/', authorize, (req: Request, res: Response) => {
  addCampaign(req, res);
});

// @route       DELETE api/campaigns/:id
// @desc        Deletes a Campaign from the DB
// @access      PRIVATE
campaignRouter.delete('/:id', authorize, (req: Request, res: Response) => {
  deleteCampaign(req, res);
});

// @route       PUT api/campaigns/:id;
// @desc        Update Campaign sheet and info
// @access      PRIVATE
campaignRouter.put('/:id', authorize, (req: Request, res: Response) => {
  updateCampaign(req, res);
});

export default campaignRouter;
