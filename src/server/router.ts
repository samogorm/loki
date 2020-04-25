import express from 'express';
import Client from './../api/client/client.controller';
import User from './../api/user/user.controller';
import AuthToken from './../api/auth_token/auth_token.controller';
import Permission from './../api/permission/permission.controller';
import LoginSession from './../api/login_session/login_session.controller';
import AuthController from './../api/auth/auth.controller';

const router = express.Router();

router.route('/test').get(async (req, res) => res.status(200).json({ message: `Success!` }));

// Auth
router.route('/oauth/token').post(async (req, res) => AuthController.login({ req, res }));

// Clients
router.route('/clients').post(AuthToken.validateJWT, AuthController.isAdmin, async (req, res) => Client.create({ req, res }));
router.route('/clients').get(AuthToken.validateJWT, AuthController.isAdmin, async (req, res) => Client.getAll({ req, res }));
router.route('/clients/:client_id').get(AuthToken.validateJWT, AuthController.isAdmin, async (req, res) => Client.get({ req, res  }));
router.route('/clients/:client_id').put(AuthToken.validateJWT, AuthController.isAdmin, async (req, res) => Client.update({ req, res }));

// Users
router.route('/users').post(async (req, res) => User.create({ req, res }));
router.route('/users').get(AuthToken.validateJWT, AuthController.isAdmin, async (req, res) => User.getAll({ req, res }));
router.route('/users/:user_id').get(AuthToken.validateJWT, AuthController.isAdmin || AuthController.isAuth, async (req, res) => User.get({ req, res }));
router.route('/users/:user_id').put(AuthToken.validateJWT, AuthController.isAdmin || AuthController.isAuth, async (req, res) => User.update({ req, res }));

// Permission
router.route('/permissions').post(AuthToken.validateJWT, AuthController.isAdmin, async (req, res) => Permission.create({ req, res }));
router.route('/permissions').get(AuthToken.validateJWT, AuthController.isAdmin, async (req, res) => Permission.getAll({ req, res }));
router.route('/permissions/:permission_id').get(AuthToken.validateJWT, AuthController.isAdmin, async (req, res) => Permission.get({ req, res }));
router.route('/permissions/:permission_id').put(AuthToken.validateJWT, AuthController.isAdmin, async (req, res) => Permission.update({ req, res }));

// Auth Token
router.route('/authtokens').get(AuthToken.validateJWT, AuthController.isAdmin, async (req, res) => AuthToken.getAll({ req, res }));
router.route('/authtokens/:token_id').get(AuthToken.validateJWT, AuthController.isAdmin, async (req, res) => AuthToken.get({ req, res }));
router.route('/authtokens/:token_id').put(AuthToken.validateJWT, AuthController.isAdmin, async (req, res) => AuthToken.update({ req, res }));

// Login Session
router.route('/loginsessions').get(async (req, res) => LoginSession.getAll({ req, res }));
router.route('/loginsessions/:session_id').get(async (req, res) => LoginSession.get({ req, res }));

export default router;
