import mongoose from 'mongoose';

export interface TUser {
  name: string;
  email: string;
  password: string;
  gender: string;
  avatar?: string;
  date: Date;
}

const userSchema = new mongoose.Schema<TUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  gender: { type: String, required: true },
  avatar: String,
  date: {
    type: Date,
    default: new Date(Date.now()),
  },
});

const User = mongoose.model('user', userSchema);

export default User;
