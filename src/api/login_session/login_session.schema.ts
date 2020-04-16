import mongoose, { Schema } from 'mongoose';
import ILoginSession from './login_session.interface';
import UserSchema from '../user/User.schema';
import ClientSchema from '../client/client.schema';
import TokenSchema from '../token/token.schema';

const LoginSessionSchema: Schema = new Schema({
  type: {
    type: String,
    required: true
  },
  user: {
    type: UserSchema,
    required: true
  },
  client: {
    type: ClientSchema,
    required: true
  },
  token: {
    type: TokenSchema,
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
