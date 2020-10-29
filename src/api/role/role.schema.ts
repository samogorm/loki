import mongoose, { Schema } from 'mongoose';
import IRole from './role.interface';

const RoleSchema: Schema = new Schema({
  title: {
    type: String,
    required: true
  },
  uniqueId: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  },
  active: {
    type: Boolean,
    default: true,
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

export default mongoose.model<IRole>('Role', RoleSchema);
