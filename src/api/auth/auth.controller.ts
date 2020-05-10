import { add } from 'date-fns'; 

import { sendEmail, JSONWebToken, Encryption } from './../../helpers';
import User from './../user/user.schema';
import UserModel from './../user/user.model';
import ClientModel from './../client/client.model';
import TokenModel from './../token/token.model';
import Token from './../token/token.schema';
import TokenController from '../token/token.controller';
import LoginSessionController from '../login_session/login_session.controller';

const AuthController = {
  login: async (data: any) => {
    const { req, res } = data;
    const { email, password } = req.body;
    const user: any = await UserModel.findBy('email', email);
    const client = await ClientModel.findBy('_id', req.body.clientId);

    const passwordMatch = Encryption.decrypt(password) === Encryption.decrypt(user.password);
    const isClientValidated = client ? await ClientModel.validate(client, req.body.clientSecret) : false;

    if (passwordMatch && isClientValidated) {
      let existingToken: any = null;
      await Token.findOne({ user: user, type: 'Login' }, {}, { sort: { 'created_at': 0 } }, function async(err: any, document: any) {
        if (err) return null;

        if (document) return existingToken = document.token;
        else return existingToken = null;
      });

      if (existingToken) {
        existingToken = await TokenModel.hasTokenExpired(existingToken);
      }

      let token: any = null;
      if (existingToken === null || existingToken.hasExpired) {
        token = JSONWebToken.generate(user.email);
        const today = new Date();
        const expiresAt = today.setDate(today.getDate() + 3)

        TokenController.create({ token, client, user, expiresAt });
      }
      const loginSession = {
        type: 'Login',
        user,
        client,
        token
      };

      LoginSessionController.create(loginSession);

      return res.status(200).json({
        message: 'Successfully authenticated.',
        data: {
          token: token ? token :  existingToken.token.token,
          expiresAt: token ? token.expiresAt : existingToken.token.expiresAt,
        }
      });
    }

    return res.status(401).json({
      message: 'Unauthorised.',
      data: null
    });
  },

  resetPassword: async (data: any) => {
    const { req, res } = data;
    const email: string = req.body.email;
    const clientId = req.body.clientId;

    const user: any = await UserModel.findBy('email', email);
    const client: any = await ClientModel.findBy('_id', clientId);

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
        url: `${client.url}/reset-password/${token}`
      });
    }

    return res.status(200).json({
      message: `An email with a reset token will be sent to ${email}, if it exists.`
    });
  },

  updatePassword: async (data: any) => {
    const { req, res } = data;
    const resetToken: any = req.body.reset_token;
    const newPassword: string = req.body.password;

    const token: any = await Token.findOne({ token: resetToken, type: 'Reset Password' }, function async(err: any, document: any) {
      if (err) return null;

      return document;
    });

    const hasTokenExpired = await TokenModel.hasTokenExpired(token.token);

    if (hasTokenExpired.hasExpired) {
      return  res.status(401).json({
        message: 'Reset token has expired.'
      });
    }

    let error: boolean = false;
    let errorMessage: any = null;

    await User.findOneAndUpdate({ _id: token?.user._id }, { $set:{ password: newPassword } }, (err: any, doc: any) => {
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
      message: 'Successfully updated password.'
    });
  },

  isAdmin: (req: any, res: any, next: any) => {
    const authorizationHeader = req.headers.authorization;
    let result: any = '';
    if (authorizationHeader) {
      const token = req.headers.authorization.split(' ')[1];

      Token.find({ token: token })
      .then((token: any) => {
        if(token[0].user.permissions.includes('Admin') && token[0].user.active) {
          next();
        } else {
          result = {
            error: `Authentication error. Insufficient permissions.`,
            status: 401
          };
          res.status(401).send(result);
        }
      }).catch((err: any) => res.send(err));
    }
  },

  isAuth: (req: any, res: any, next: any) => {
    const authorizationHeader = req.headers.authorization;

    let result: any = '';
    if (authorizationHeader) {
      const token = req.headers.authorization.split(' ')[1];

      Token.find({ token: token })
      .then((token: any) => {
        if(token[0].user.active) {
          next();
        } else {
          result = {
            error: `Authentication error.`,
            status: 401
          };
          res.status(401).send(result);
        }
      }).catch((err: any) => res.send(err));
    }
  },
}

export default AuthController;
