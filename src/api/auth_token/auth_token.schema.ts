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

export default mongoose.model<IAuthToken>('AuthToken', AuthTokenSchema);
