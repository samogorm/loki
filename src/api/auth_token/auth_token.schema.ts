import mongoose, { Schema } from 'mongoose';
import IAuthToken from './auth_token.interface';

const AuthTokenSchema: Schema = new Schema({
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

export default mongoose.model<IAuthToken>('AuthToken', AuthTokenSchema);
