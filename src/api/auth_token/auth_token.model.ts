import AuthToken from './auth_token.schema';
import IAuthToken from './auth_token.interface';
import { ftruncate } from 'fs';

const AuthTokenModel = {
  findBy: async (key: any, value: any) => {
    let result: any;

    await AuthToken.findOne({ [key]: value })
      .then(authToken => result = authToken)
      .catch(err => {
        console.log(err);
        result = null;
      });

    return result;
  },

  hasTokenExpired: async (token: any) => {
    const now: Date = new Date();
    let foundToken: any;
    
    await AuthToken.findOne({ token: token })
    .then(authToken => foundToken = authToken)
    .catch(err => {
      return {
        hasExpired: true,
        token: null
      };
    });

    return {
      hasExpired: foundToken.expiresAt <= now,
      token: foundToken
    };
  }
};

export default AuthTokenModel;
