import { add } from 'date-fns';

import { sendEmail, JSONWebToken, Encryption } from '../../helpers';
import User from '../user/user.schema';
import UserModel from '../user/user.schema';
import ClientModel from './../client/client.model';
import TokenModel from '../token/token.schema';
import Token from '../token/token.schema';
import TokenController from '../token/token.controller';
import LoginSessionController from '../login_session/login_session.controller';

const AuthController = {
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
