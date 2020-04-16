import { Document } from 'mongoose';

interface IToken extends Document {
  token: string;
  user: object;
  client: object;
  expired: boolean;
  expiresAt: string;
  createdAt: string;
  updatedAt: string;
}

export default IToken;
