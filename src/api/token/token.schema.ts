import mongoose, { Schema } from 'mongoose';
import IToken from './token.interface';
import UserSchema from '../user/User.schema';
import ClientSchema from '../client/client.schema';

const TokenSchema: Schema = new Schema({
  token: {
    type: String,
    required: true
  },
  user: {
    type: UserSchema,
    required: true
  },
  client: {
    type: ClientSchema,
    required: true
  },
  expired: {
    type: Boolean,
    default: false,
  },
  expiresAt: {
    type: Date,
    default: Date.now
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model<IToken>('Token', TokenSchema);
