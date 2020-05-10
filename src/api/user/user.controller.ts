import { add } from 'date-fns';

import IUser from './user.interface';
import User from './user.schema';
import UserModel from './user.model';
import ClientModel from '../client/client.model';
import TokenController from './../token/token.controller';
import Encryption from './../../helpers/encryption';
import { sendEmail } from './../../helpers';

const UserController = {
  create: async (data: any) => {
    const { req, res } = data;

    const userDetails = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    }

    const user = new User(userDetails);

    user.password = Encryption.encrypt(req.body.password);
    const emailTaken = await UserModel.checkEmailExists(req.body.email);

    if (emailTaken) {
      return res.status(400).json({
        message: `The email ${req.body.email} is already in use.`,
        data: null
      });
    }

    const client = await ClientModel.findBy('_id', req.body.clientId);

    return user.save(function (err: any, user: IUser) {
      const success = err ? false : true;
      const result = err ? err : user;

      if (success) {
        UserController.sendActivationEmail(client, user);

        return res.status(201).json({
          message: 'Successfully created User.',
          data: result
        });
      }

      return res.status(500).json({
        message: err,
        data: null
      });
    });
  },

  resendActivationEmail: async (data: any) => {
    const { req, res } = data;
    const email = req.body.email;
    const clientId = req.body.clientId;

    const user = await UserModel.findBy('email', email);
    const client = await ClientModel.findBy('_id', clientId);

    UserController.sendActivationEmail(client, user);

    return res.status(200).json({
      message: 'Email resent.'
    });
  },

  // TODO: Move this somewhere else
  sendActivationEmail: async (client: any, user: any) => {
    const token = TokenController.generateJWT(user.email);
    const today = new Date();
    const expiresAt = add(today, { minutes: 120 });
    const name: any = user.name.split(' ')[0];

    TokenController.create({ token, client, user, type: 'Activate Account', expiresAt });

    sendEmail(`${client.name}`, user.email, 'Activate Your Account', 'activate_account', { 
      name,
      token, 
      app: client.name, 
      url: `${client.url}/activate-account/${token}`
    });
  },

  get: async (data: any) => {
    const { req, res } = data;
    const userId = req.params.user_id;
    let error: boolean = false;
    let errorMessage: any = null;

    const user = await User.findById(userId)
      .catch(err => {
        error = true;
        errorMessage = err;
      });

    if (!error) {
      return res.status(200).json({
        message: 'Successfully retrieved the User.',
        data: user
      });
    }

    return res.status(500).json({
      message: errorMessage,
      data: null
    });
  },

  getAll: async (data: any) => {
    const { res } = data;
    let users: any = [];
    let error: boolean = false;
    let errorMessage: any = null;

    await User.find()
      .then(data => users = data)
      .catch(err => {
        error = true;
        errorMessage = err;
      });

    if (!error) {
      return res.status(200).json({
        message: 'Successfully retrieved the Users.',
        data: users
      });
    }

    return res.status(500).json({
      message: errorMessage,
      data: null
    });
  },

  update: async (data: any) => {
    const { req, res } = data;
    const userId = req.params.user_id;

    let error: boolean = false;
    let errorMessage: any = null;

    const user = await User.findOneAndUpdate({ _id: userId }, req.body, (err: any, doc: any) => {
      if (err) {
        error = true;
        errorMessage = err;
      }

      return doc;
    });

    if (!error) {
      return res.status(200).json({
        message: 'Successfully updated the User.',
        data: user
      });
    }

    return res.status(500).json({
      message: errorMessage,
      data: null
    });
  },
}

export default UserController;
