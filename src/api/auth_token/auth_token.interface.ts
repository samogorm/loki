import { Document } from 'mongoose';

interface IAuthToken extends Document {
  token: string;
  user: object;
  client: object;
  expiresAt: string;
  createdAt: string;
  updatedAt: string;
}

export default IAuthToken;
