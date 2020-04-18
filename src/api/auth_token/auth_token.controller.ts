require('dotenv').config();

import jwt from 'jsonwebtoken';

import IAuthToken from './auth_token.interface';
import AuthToken from './auth_token.schema';

const AuthTokenController = {
  create: (data: any) => {
    const authToken = new AuthToken(data);

    return authToken.save(function (err: any, authToken: IAuthToken) {
      const success = err ? false : true;
      const result = err ? err : authToken;

      if (success) {
       return true;
      }

      return false;
    });
  },

  hasTokenExpired: () => {
    // TODO: 
  },

  generateJWT: (email: string) => {
    const payload = { user: email };
    const options = {
      expiresIn: `${process.env.JWT_EXPIRY}d`,
      issuer: process.env.JWT_ISSUER
    };

    const secret = process.env.JWT_SECRET;
    const token = jwt.sign(payload, 'test', options);

    return token;
  },

  validateJWT: (req: any, res: any, next: Function) => {
    const authorizationHeader = req.headers.authorization;

    let result;
    if (authorizationHeader) {
      const token = req.headers.authorization.split(' ')[1];
      const options = {
        expiresIn: process.env.JWT_EXPIRY,
        issuer: process.env.JWT_ISSUER
      };

      try {
        result = jwt.verify(token, 'test', options);
        req.decoded = result;
        next();
      } catch (err) {
        throw new Error(err);
      }

    } else {

      result = {
        error: `Authentication error. Token required.`,
        status: 401
      };

      res.status(401).send(result);
    }
  }
}

export default AuthTokenController;
