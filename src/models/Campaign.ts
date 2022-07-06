import mongoose, { Types } from 'mongoose';
import { CampaignStatus } from '../types/campaigns';

export interface Player {
  user: Types.ObjectId;
  character: Types.ObjectId;
}

export interface ICampaign {
  DM: Types.ObjectId | undefined;
  DMname: string;
  campaignName: string;
  description: string;
  characters: Array<Player>;
  status: CampaignStatus;
  dateStarted: Date;
  dateEnded?: Date;
  imgUrl?: string;
  sessionLogs: string;
}

// export interface ISession {
//   _id: Types.ObjectId;
//   dateCreated: Date;
//   summary: string;
//   scenes?: Array<string>;
//   npcs?: Array<string>;
//   loot?: Array<string>;
//   encounters?: Array<string>;
// }

export const CampaignSchema = new mongoose.Schema<ICampaign>({
  DM: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
  DMname: { type: String },
  campaignName: { type: String },
  description: { type: String },
  characters: [
    {
      character: { type: mongoose.Schema.Types.ObjectId, ref: 'character' },
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    },
  ],
  status: { type: String },
  dateStarted: { type: Date, default: new Date(Date.now()) },
  dateEnded: { type: Date },
  imgUrl: { type: String },
  sessionLogs: { type: String },
  // sessions: [
  //   {
  //     dateCreated: { type: Date, default: new Date(Date.now()) },
  //     summary: { type: String },
  //     scenes: { type: [String] },
  //     npcs: { type: [String] },
  //     loot: { type: [String] },
  //     encounters: { type: [String] },
  //   },
  // ],
});

const Campaign = mongoose.model('campaign', CampaignSchema);
export default Campaign;
