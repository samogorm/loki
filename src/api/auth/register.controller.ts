import { add } from 'date-fns'; 

import User from './../user/user.schema';
import Token from './../token/token.schema';
import TokenModel from './../token/token.model';
import UserModel from './../user/user.model';
import ClientModel from './../client/client.model';
import TokenController from '../token/token.controller';
import { sendEmail, JSONWebToken } from './../../helpers';

const RegisterController = {
  activate: async (data: any) => {
    const { req, res } = data;
    const tokenId = req.params.token;

    const token: any = await Token.findOne({ token: tokenId, type: 'Activate Account' }, function async(err: any, document: any) {
      if (err) return null;

      return document;
    });

    const hasTokenExpired = await TokenModel.hasTokenExpired(token.token);

    if (hasTokenExpired.hasExpired) {
      return  res.status(401).json({
        message: 'Activate token has expired.'
      });
    }

    let error: boolean = false;
    let errorMessage: any = null;

    await User.findOneAndUpdate({ _id: token?.user._id }, { $set:{ active: true } }, (err: any, doc: any) => {
      if (err) {
        error = true;
        errorMessage = err;
      }

      return doc;
    });

    if (error) {
      return res.status(500).json({
        message: errorMessage,
        data: null
      });
    }

    return res.status(200).json({
      message: 'Successfully activated account.'
    });
  },

  resendActivationEmail: async (data: any) => {
    const { req, res } = data;
    const email = req.body.email;
    const clientId = req.body.clientId;

    const user = await UserModel.findBy('email', email);
    const client = await ClientModel.findBy('_id', clientId);

    RegisterController.sendActivationEmail(client, user);

    return res.status(200).json({
      message: 'Email resent.'
    });
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
      logo: client.brand.logo,
      primary: client.brand.colours.primary,
      secondary: client.brand.colours.secondary
    });
  },
}

export default RegisterController;
