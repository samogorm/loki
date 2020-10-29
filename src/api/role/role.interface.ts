import { Document } from 'mongoose';

interface IRole extends Document {
  title: string;
  uniquedId: string;
  description: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export default IRole;
