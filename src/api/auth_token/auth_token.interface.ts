import { Document } from 'mongoose';

interface IAuthToken extends Document {
  token: string;
  user: any;
  client: object;
  expiresAt: string;
  createdAt: string;
  updatedAt: string;
}

export default IAuthToken;
