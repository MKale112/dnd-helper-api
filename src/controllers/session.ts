import express, { Request, Response } from 'express';
import { Types } from 'mongoose';
import Campaign from '../models/Campaign';
import Character from '../models/Character';

export const getCharsForSession = async (req: Request, res: Response) => {
  const campaignID = req.params.id;
  const characterIDs = await Campaign.findById(campaignID).select('characters.character');

  const ids = characterIDs?.characters.map((item) => item.character);

  const characters = await Character.find({ _id: { $in: ids } });
  if (!characters) {
    res.status(404).json({ msg: 'There are no characters in this campaign!' });
  }

  console.log('characters: ', characters);
  res.status(200).json(characters);
};
