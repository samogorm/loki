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

  get: async (data: any) => {
    const { req, res } = data;
    const tokenId = req.params.token_id;
    let error: boolean = false;
    let errorMessage: any = null;

    const token = await AuthToken.findById(tokenId)
      .catch(err => {
        error = true;
        errorMessage = err;
      });

    if (!error) {
      return res.status(200).json({
        message: 'Successfully retrieved the Auth Token.',
        data: token
      });
    }

    return res.status(500).json({
      message: errorMessage,
      data: null
    });
  },

  getAll: async (data: any) => {
    const { res } = data;
    let tokens: any = [];
    let error: boolean = false;
    let errorMessage: any = null;

    await AuthToken.find()
      .then(data => tokens = data)
      .catch(err => {
        error = true;
        errorMessage = err;
      });

    if (!error) {
      return res.status(200).json({
        message: 'Successfully retrieved the Auth Token.',
        data: tokens
      });
    }

    return res.status(500).json({
      message: errorMessage,
      data: null
    });
  },

  update: async (data: any) => {
    const { req, res } = data;
    const tokenId = req.params.token_id;
    console.log('herrrrreee');

    let error: boolean = false;
    let errorMessage: any = null;
    console.log(req.body)

    const token = await AuthToken.findOneAndUpdate({ _id: tokenId }, req.body, (err: any, updatedToken: any) => {
      if (err) {
        error = true;
        errorMessage = err;
      }

      return updatedToken;
    });

    if (!error) {
      return res.status(200).json({
        message: 'Successfully updated the AuthToken.',
        data: token
      });
    }

    return res.status(500).json({
      message: errorMessage,
      data: null
    });
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
