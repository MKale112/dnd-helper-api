import mongoose, { Types } from 'mongoose';
import { CharacterGender } from '../types/characters';

export interface ICharacter {
  playerId: Types.ObjectId | undefined;
  characterName: string;
  gender: CharacterGender;
  status: string;
  race: string;
  level: number;
  characterClass: string;
  attributes?: {
    strength: number;
    dexterity: number;
    constitution: number;
    intelligence: number;
    wisdom: number;
    charisma: number;
  };
  // "none" | "proficient"
  saves?: {
    strength: boolean;
    dexterity: boolean;
    constitution: boolean;
    intelligence: boolean;
    wisdom: boolean;
    charisma: boolean;
  };
  proficiency_bonus?: number;
  weapon?: string;
  armor?: string;
  shield: boolean;
  hitpoint_max?: number;
  bio?: [string];
  wallet?: { cp: number; sp: number; gp: number };
}

const CharacterSchema = new mongoose.Schema<ICharacter>({
  playerId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
  characterName: { type: String, required: true },
  gender: { type: String, required: false },
  status: { type: String, required: true },
  race: { type: String, required: true },
  level: { type: Number, required: true },
  characterClass: { type: String, required: true },
  attributes: {
    strength: { type: Number },
    dexterity: { type: Number },
    constitution: { type: Number },
    intelligence: { type: Number },
    wisdom: { type: Number },
    charisma: { type: Number },
  },
  // "none" | "proficient"
  saves: {
    strength: { type: Boolean },
    dexterity: { type: Boolean },
    constitution: { type: Boolean },
    intelligence: { type: Boolean },
    wisdom: { type: Boolean },
    charisma: { type: Boolean },
  },
  proficiency_bonus: { type: Number },
  weapon: { type: String },
  armor: { type: String },
  shield: { type: Boolean },
  hitpoint_max: { type: Number },
  bio: [{ type: String }],
  wallet: { cp: { type: Number }, sp: { type: Number }, gp: { type: Number } },
});

const Character = mongoose.model('character', CharacterSchema);

export default Character;
