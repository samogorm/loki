import { isAfter, parseISO, add } from 'date-fns';

import { Encryption, JSONWebToken, sendEmail } from '../../helpers';
import { UserModel as User } from '../user';
import  { tokenSchema as Token, TokenController } from '../token';
import { ClientModel as Client, ClientController } from './../client';
import LoginSessionController from '../login_session/login_session.controller';

class AuthenticationController {
  async login(email: string, password: string, req: any) {
    const user: any = await User.findOne({ email }).then(user => user);
    const client: any = await Client.findOne({ _id: req.clientId }).then(client => client);

    const passwordMatch = Encryption.decrypt(password) === Encryption.decrypt(user.password);
    const isClientValidated = client ? ClientController.validate(client, req.clientSecret) : false;
    let token: any = null;

    if (passwordMatch && isClientValidated) {
      const now: any =  new Date();
      token = await Token.findOne({ user, type: 'Login' }, {}, { sort: { 'created_at': 0 } }).then((item: any) => item);
      const hasTokenExpired = token ? isAfter(parseISO(token?.expiresAt), parseISO(now)) : true;

      if (hasTokenExpired) {
        token = JSONWebToken.generate(user.email);
        const today = new Date();
        const expiresAt = today.setDate(today.getDate() + 3)

        TokenController.create({ token, client, user, expiresAt });
      }

      const loginSession = { type: 'Login', user, client, token };
      const loginSessionController = new LoginSessionController();
      loginSessionController.create(loginSession);
    }

    return token;
  }

  async resetPassword(email: string, clientId: string) {
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
  }

  async sendActivationEmail(client: any, user: any) {
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
  }

  async resendActivationEmail(email: string, clientId: string) {
    const user = await User.findOne({ email: email }).then(user => user);
    const client = await Client.findOne({ _id: clientId }).then(client => client);

    this.sendActivationEmail(client, user);

    return user;
  }

  async activate(activateToken: string) {
    const now: any =  new Date();
    const token: any = await Token.findOne({ token: activateToken, type: 'Activate Account' }).then(token => token);
    const hasTokenExpired = isAfter(parseISO(token.expiresAt), parseISO(now));

    if (hasTokenExpired) {
      return null;
    }

    return await User.findOneAndUpdate({ _id: token?.user._id }, { $set:{ active: true } }).then(user => user)
  }
}

export default AuthenticationController;