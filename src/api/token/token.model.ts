import Token from './token.schema';

const TokenModel = {
  findBy: async (key: any, value: any) => {
    let result: any;

    await Token.findOne({ [key]: value })
      .then(token => result = token)
      .catch(err => {
        result = null;
      });

    return result;
  },

  hasTokenExpired: async (token: any) => {
    const now: Date = new Date();
    let foundToken: any;
    
    await Token.findOne({ token: token })
    .then(token => foundToken = token)
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

export default TokenModel;
