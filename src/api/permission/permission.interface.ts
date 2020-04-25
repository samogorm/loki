import { Document } from 'mongoose';

interface IPermission extends Document {
  title: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export default IPermission;
