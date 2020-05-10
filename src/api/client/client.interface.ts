import { Document } from 'mongoose';

interface IClient extends Document {
  name: string;
  url: string;
  secret: string;
  grantType: string;
  brand: object;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export default IClient;
