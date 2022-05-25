import mongoose, { Schema, Types } from 'mongoose';

export interface TUser {
  id: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  gender: string;
  avatar?: string;
  characters?: Array<Types.ObjectId>;
  date: Date;
}

const UserSchema = new mongoose.Schema<TUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  gender: { type: String, required: true },
  avatar: { type: String },
  characters: [{ type: Schema.Types.ObjectId, ref: 'character' }],
  date: {
    type: Date,
    default: new Date(Date.now()),
  },
});

const User = mongoose.model('user', UserSchema);

export default User;
