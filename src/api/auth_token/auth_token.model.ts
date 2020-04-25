import AuthToken from './auth_token.schema';
import IAuthToken from './auth_token.interface';

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

  hasTokenExpired: (token: string) => {
    // TODO: 
    return AuthToken.find({ token: token }, function (err: any, authToken: IAuthToken) {
      console.log(authToken);
    });
  },
};

export default AuthTokenModel;
