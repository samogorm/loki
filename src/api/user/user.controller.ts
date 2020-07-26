import { isAfter, parseISO, add } from 'date-fns';

import { ClientModel as Client, ClientController } from './../client';
import { UserModel as User, UserInterface as IUser } from './index';
import { Encryption, JSONWebToken, sendEmail } from './../../helpers';
import Token from './../token/token.schema';
import TokenController from './../token/token.controller';
import LoginSessionController from './../login_session/login_session.controller';

const UserController = {
  getById: (id: string) => User.findById(id),

  getAll: () => User.find().then(users => users),

  create: async (data: any) => {
    const { name, email, password, clientId } = data;
    const client = await Client.findOne({ _id: clientId }).then(client => client);
    const user = new User({ name, email, password: Encryption.encrypt(password)});

    return user.save().then(user => {
      UserController.sendActivationEmail(client, user);

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
  },

  resetPassword: async (email: string, clientId: string) => {
    const user: any = await User.findOne({ email }).then(user => user);
    const client: any = await Client.findOne({ _id: clientId }).then(client => client);

    if (user && client) {
      const token = JSONWebToken.generate(email);
      const today = new Date();
      const expiresAt = add(today, { minutes: 90 });
      const name = user.name.split(' ')[0];

      TokenController.create({ token, client, user, type: 'Reset Password', expiresAt });
      sendEmail(`${client.name}`, email, 'Reset Password', 'reset_password', {
        name,
        token,
        app: client.name,
        url: `${client.url}/reset-password/${token}`,
        website: client.url,
        logo: client.brand.logo,
        primary: client.brand.colours.primary,
        secondary: client.brand.colours.secondary
      });
    }

    return user;
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

  sendActivationEmail: async (client: any, user: any) => {
    const token = JSONWebToken.generate(user.email);
    const today = new Date();
    const expiresAt = add(today, { minutes: 120 });
    const name: any = user.name.split(' ')[0];

    TokenController.create({ token, client, user, type: 'Activate Account', expiresAt });

    sendEmail(`${client.name}`, user.email, 'Activate Your Account', 'activate_account', { 
      name,
      token, 
      app: client.name, 
      url: `${client.url}/activate-account/${token}`,
      website: client.url,
      logo: client.brand.logo,
      primary: client.brand.colours.primary,
      secondary: client.brand.colours.secondary
    });
  },

  resendActivationEmail: async (email: string, clientId: string) => {
    const user = await User.findOne({ email: email }).then(user => user);
    const client = await Client.findOne({ _id: clientId }).then(client => client);

    UserController.sendActivationEmail(client, user);

    return user;
  },

  activate: async (activateToken: string) => {
    const now: any =  new Date();
    const token: any = await Token.findOne({ token: activateToken, type: 'Activate Account' }).then(token => token);
    const hasTokenExpired = isAfter(parseISO(token.expiresAt), parseISO(now));

    if (hasTokenExpired) {
      return null;
    }

    return await User.findOneAndUpdate({ _id: token?.user._id }, { $set:{ active: true } }).then(user => user)
  },
}

export default UserController;
