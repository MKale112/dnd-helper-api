import mongoose, { Types } from 'mongoose';

export interface ICampaign {
  DM: Types.ObjectId | undefined;
  characters: Array<Types.ObjectId>;
  dateCreated: Date;
  sessions: Types.Array<ISession>;
}

export interface ISession {
  _id: Types.ObjectId;
  dateCreated: Date;
  summary: string;
  scenes?: Array<string>;
  npcs?: Array<string>;
  loot?: Array<string>;
  encounters?: Array<string>;
}

export const CampaignSchema = new mongoose.Schema<ICampaign>({
  DM: { type: Types.ObjectId, ref: 'user' },
  characters: [{ type: Types.ObjectId, ref: 'character' }],
  dateCreated: { type: Date, default: new Date(Date.now()) },
  sessions: [
    {
      dateCreated: { type: Date, default: new Date(Date.now()) },
      summary: { type: String },
      scenes: { type: [String] },
      npcs: { type: [String] },
      loot: { type: [String] },
      encounters: { type: [String] },
    },
  ],
});

const Campaign = mongoose.model('campaign', CampaignSchema);
export default Campaign;
