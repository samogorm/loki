import { isAfter, parseISO } from 'date-fns';

import { ClientModel as Client } from './../client';
import { UserModel as User, UserInterface as IUser } from './index';
import { Encryption } from './../../helpers';
import Token from './../token/token.schema';
import { AuthenticationController } from '../authentication';


const UserController = {
  getById: (id: string) => User.findById(id),

  getAll: () => User.find().then(users => users),

  create: async (data: any) => {
    const { name, email, password, clientId } = data;
    const client = await Client.findOne({ _id: clientId }).then(client => client);
    const user = new User({ name, email, password: Encryption.encrypt(password)});

    return user.save().then(user => {
      const authenticationController = new AuthenticationController();
      authenticationController.sendActivationEmail(client, user);

      return user;
    });
  },

  update: (id: string, name: string, email: string, password: string, active: boolean, permissions: any) => {
    const data = { name, email, password: Encryption.encrypt(password), active, permissions };

    return User.findOneAndUpdate({ _id: id }, data, { new: true }).then(user => user);
  },

  updatePassword: async (password: string, resetToken: string) => {
    const now: any =  new Date();
    const token: any = await Token.findOne({ token: resetToken, type: 'Reset Password' }).then(token => token);
    const hasTokenExpired = isAfter(parseISO(token.expiresAt), parseISO(now));

    if (hasTokenExpired) {
      return null;
    }
  
    return await User.findOneAndUpdate({ _id: token?.user._id }, { $set:{ password }}, { new: true }).then(user => user);
  },
}

export default UserController;
