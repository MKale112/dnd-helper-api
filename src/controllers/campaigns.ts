import express, { Request, Response } from 'express';
import Campaign from '../models/Campaign';
import { CampaignStatus, ICampaignInput } from '../types/campaigns';
import User from '../models/User';

export const getCampaigns = async (req: Request, res: Response) => {
  const { id } = req.body.locals;
  try {
    const campaigns = await Campaign.find({ $or: [{ DM: id }, { 'characters.user': id }] });
    if (!campaigns) {
      return res.status(200).json([]);
    }

    res.status(200).json(campaigns);
  } catch (error) {
    console.log(error);
  }
};

export const addCampaign = async (req: Request, res: Response) => {
  const { id } = req.body.locals;
  const { campaignName, description, imgUrl } = req.body as ICampaignInput;

  try {
    let campaign = await Campaign.findOne({ campaignName });
    if (campaign) {
      return res.status(400).json({ errors: [{ msg: 'This campaign already exist.' }] });
    }

    const DM = await User.findById(id);

    const newCampaign = new Campaign({
      DM: id,
      DMname: DM?.name,
      campaignName,
      description,
      characters: [],
      status: CampaignStatus.ONGOING,
      dateStarted: new Date(),
      dateEnded: undefined,
      imgUrl,
      sessionLogs: '',
    });

    await newCampaign.save();

    res.status(200).json(newCampaign);
  } catch (err) {
    console.log(err);
  }
};

export const deleteCampaign = async (req: Request, res: Response) => {
  try {
    const campaign = await Campaign.findById(req.params.id);
    if (!campaign) {
      return res.status(404).json({ msg: 'Campaign not found' });
    }

    // check if the user that is deleting the post actually OWNS the post
    if (campaign.id.toString() !== req.params.id) {
      res.status(401).json({ msg: 'User not authorised' });
    }

    await campaign.remove();
    res.json({ msg: 'Character removed!' });
  } catch (error: any) {
    console.log(error);
    res.status(500).json('Server Error');
  }
};

export const updateCampaign = async (req: Request, res: Response) => {
  try {
    const { campaignName, description, imgUrl } = req.body as ICampaignInput;

    const campaign = await Campaign.findById(req.params.id);
    if (!campaign) {
      return res.status(404).json({ msg: 'Campaign not found' });
    }

    campaign.campaignName = campaignName;
    campaign.description = description;
    campaign.imgUrl = imgUrl;

    await campaign.save();

    res.status(200).json({ msg: 'Character Updated!' });
  } catch (err) {
    console.log(err);
  }
};
