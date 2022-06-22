export enum CampaignStatus {
  'ONGOING' = 'ongoing',
  'FINISHED' = 'finished',
  'HIATUS' = 'hiatus',
  'CANCELLED' = 'cancelled',
}

export interface ICampaignInput {
  campaignName: string;
  description: string;
  imgUrl: string;
}
