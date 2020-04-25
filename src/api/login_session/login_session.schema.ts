import mongoose, { Schema } from 'mongoose';
import ILoginSession from './login_session.interface';

const LoginSessionSchema: Schema = new Schema({
  type: {
    type: String,
    required: true
  },
  user: {
    type: Object,
    required: true
  },
  client: {
    type: Object,
    required: true
  },
  token: {
    type: Object,
    required: true
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

export default mongoose.model<ILoginSession>('LoginSesssion', LoginSessionSchema);
