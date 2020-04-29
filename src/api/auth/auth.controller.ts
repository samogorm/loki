import UserModel from './../user/user.model';
import ClientModel from './../client/client.model';
import AuthTokenModel from './../auth_token/auth_token.model';
import AuthToken from './../auth_token/auth_token.schema';
import Encryption from '../../helpers/encryption';
import AuthTokenController from '../auth_token/auth_token.controller';
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
      await AuthToken.findOne({ user: user}, {}, { sort: { 'created_at': 0 } }, function async(err: any, document: any) {
        if (err) return null;
  
        if (document) return existingToken = document.token;
        else return existingToken = null;
      });
     
      if (existingToken) {
        existingToken = await AuthTokenModel.hasTokenExpired(existingToken);
      }
      
      let token: any = null;
      if (existingToken === null || existingToken.hasExpired) {
        token = AuthTokenController.generateJWT(user.email);
        const today = new Date();
        const expiresAt = today.setDate(today.getDate() + 3)

        AuthTokenController.create({ token, client, user, expiresAt });
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

  isAdmin: (req: any, res: any, next: any) => {
    const authorizationHeader = req.headers.authorization;
    let result: any = '';
    if (authorizationHeader) {
      const token = req.headers.authorization.split(' ')[1];

      AuthToken.find({ token: token })
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
    const paramId = req.params.user_id;
  
    let result: any = '';
    if (authorizationHeader) {
      const token = req.headers.authorization.split(' ')[1];

      AuthToken.find({ token: token })
      .then((token: any) => {
        if(token[0].user._id === paramId && token[0].user.active) {
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
