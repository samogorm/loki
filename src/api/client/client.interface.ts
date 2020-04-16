import { Document } from 'mongoose';

interface IClient extends Document {
  secret: string;
  grantType: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export default IClient;
