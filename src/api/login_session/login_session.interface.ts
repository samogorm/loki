import { Document } from 'mongoose';

interface ILoginSession extends Document {
  type: string;
  user: object;
  token: object;
  client: object;
  createdAt: string;
  updatedAt: string;
}

export default ILoginSession;
