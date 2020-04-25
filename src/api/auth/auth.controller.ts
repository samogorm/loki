import UserModel from './../user/user.model';
import ClientModel from './../client/client.model';
import AuthTokenModel from './../auth_token/auth_token.model';
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
    console.log(passwordMatch);
    const isClientValidated = client ? await ClientModel.validate(client, req.body.clientSecret) : false;

    if (passwordMatch && isClientValidated) {
      // TODO: check if user already has valid token
      // const existingToken = AuthTokenModel.findBy('user', )
      const token = AuthTokenController.generateJWT(user.email);
      const today = new Date();
      const expiresAt = today.getDate() + 3;

      AuthTokenController.create({ token, client, user, expiresAt });

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
          token
        }
      });
    }

    return res.status(401).json({
      message: 'Unauthorised.',
      data: null
    });
  }
}

export default AuthController;
