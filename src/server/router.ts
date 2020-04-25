import express from 'express';
import Client from './../api/client/client.controller';
import User from './../api/user/user.controller';
import AuthToken from './../api/auth_token/auth_token.controller';
import AuthController from './../api/auth/auth.controller';
import AuthTokenModel from './../api/auth_token/auth_token.model';

const router = express.Router();

router.route('/test').get(async (req, res) => res.status(200).json({ message: `Success!` }));

// Auth
router.route('/oauth/token').post(async (req, res) => AuthController.login({ req, res }));

// Clients
router.route('/clients').post(async (req, res) => Client.create({ req, res }));
router.route('/clients').get(async (req, res) => Client.getAll({ req, res }));
router.route('/clients/:client_id').get(async (req, res) => Client.get({ req, res  }));
router.route('/clients/:client_id').put(async (req, res) => Client.update({ req, res }));

// Users
router.route('/users').post(async (req, res) => User.create({ req, res }));
router.route('/users').get(async (req, res) => User.getAll({ req, res }));
router.route('/users/:user_id').get(async (req, res) => User.get({ req, res }));
router.route('/users/:user_id').put(async (req, res) => User.update({ req, res }));

// Auth Token
router.route('/authtokens').get(async (req, res) => AuthToken.getAll({ req, res }));
router.route('/authtokens/:token_id').get(async (req, res) => AuthToken.get({ req, res }));
router.route('/authtokens/:token_id').put(async (req, res) => AuthToken.update({ req, res }));

// tests
//router.route('/hasTokenExpired').put(async (req, res) => AuthTokenModel.hasTokenExpired(res, `${req.query.token}`));
export default router;
