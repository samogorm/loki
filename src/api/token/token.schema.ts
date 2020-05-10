import mongoose, { Schema } from 'mongoose';
import IToken from './token.interface';

const TokenSchema: Schema = new Schema({
  token: {
    type: String,
    required: true
  },
  user: {
    type: Object,
    required: true
  },
  client: {
    type: Object,
    required: true
  },
  type: {
    type: String,
    default: 'Login',
  },
  expiresAt: {
    type: Date,
    default: Date.now() + 3
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
