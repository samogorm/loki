import mongoose, { Schema } from 'mongoose';
import IPermission from './permission.interface';

const PermissionSchema: Schema = new Schema({
  title: {
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

export default mongoose.model<IPermission>('Permission', PermissionSchema);
