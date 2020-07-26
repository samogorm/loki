import { isAfter, parseISO } from 'date-fns';

import { ClientModel as Client, ClientController } from './../client';
import { UserModel as User, UserInterface as IUser } from './index';
import { Encryption, JSONWebToken } from './../../helpers';
import Register from './../auth/register.controller';
import Token from './../token/token.schema';
import TokenController from './../token/token.controller';
import LoginSessionController from './../login_session/login_session.controller';
import TokenModel from '../token/token.model';

const UserController = {
  getById: (id: string) => User.findById(id),

  getAll: () => User.find().then(users => users),

  create: async (data: any) => {
    const { name, email, password, clientId } = data;
    const client = await Client.findOne({ _id: clientId }).then(client => client);
    const user = new User({ name, email, password: Encryption.encrypt(password)});

    return user.save().then(user => {
      Register.sendActivationEmail(client, user);

      return user;
    });
  },

  update: (id: string, name: string, email: string, password: string, active: boolean, permissions: any) => {
    const data = { name, email, password: Encryption.encrypt(password), active, permissions };

    return User.findOneAndUpdate({ _id: id }, data, { new: true }).then(user => user);
  },

  login: async (email: string, password: any, req: any) => {
    const user: any = await User.findOne({ email }).then(user => user);
    const client: any = await Client.findOne({ _id: req.clientId }).then(client => client);

    const passwordMatch = Encryption.decrypt(password) === Encryption.decrypt(user.password);
    const isClientValidated = client ? ClientController.validate(client, req.clientSecret) : false;
    let token: any = null;
  
    if (passwordMatch && isClientValidated) {
      const now: any =  new Date();
      token = await Token.findOne({ user: user, type: 'Login' }, {}, { sort: { 'created_at': 0 } }).then((token: any) => token);
      const hasTokenExpired = isAfter(parseISO(token.expiresAt), parseISO(now));

      if (hasTokenExpired) {
        token = JSONWebToken.generate(user.email);
        const today = new Date();
        const expiresAt = today.setDate(today.getDate() + 3)

        TokenController.create({ token, client, user, expiresAt });
      }

      const loginSession = { type: 'Login', user, client, token };
      LoginSessionController.create(loginSession);
    }

    return token;
  }
}

export default UserController;
