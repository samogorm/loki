import mongoose, { Schema } from 'mongoose';
import IClient from './client.interface';

const ClientModel: Schema = new Schema({
  name: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  secret: {
    type: String,
    required: true
  },
  grantType: {
    type: String,
    required: true
  },
  brand: {
    type: Object,
    default: {
      logo: null,
      colours: {
        primary: '#4834d4',
        secondary: '#686de0'
      }
    }
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

export default mongoose.model<IClient>('Client', ClientModel);
