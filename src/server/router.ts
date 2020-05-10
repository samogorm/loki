import express from 'express';
import Client from './../api/client/client.controller';
import User from './../api/user/user.controller';
import Token from './../api/token/token.controller';
import Permission from './../api/permission/permission.controller';
import LoginSession from './../api/login_session/login_session.controller';
import AuthController from './../api/auth/auth.controller';
import UserController from './../api/user/user.controller';
import { JSONWebToken } from './../helpers';

const router = express.Router();

// Auth
router.route('/oauth/token').post(async (req, res) => AuthController.login({ req, res }));

// Password Reset
router.route('/reset-password').post(async (req, res) => AuthController.resetPassword({ req, res }));
router.route('/update-password').post(async (req, res) => AuthController.updatePassword({ req, res }));

// Account Activation
router.route('/activate-account/:token').post(async (req, res) => AuthController.activate({ req, res }));
router.route('/resend-activation').post(async (req, res) => UserController.resendActivationEmail({ req, res }));

// Clients
router.route('/clients').post(JSONWebToken.validate, AuthController.isAdmin, async (req, res) => Client.create({ req, res }));
router.route('/clients').get(JSONWebToken.validate, AuthController.isAdmin, async (req, res) => Client.getAll({ req, res }));
router.route('/clients/:client_id').get(JSONWebToken.validate, AuthController.isAdmin, async (req, res) => Client.get({ req, res  }));
router.route('/clients/:client_id').put(JSONWebToken.validate, AuthController.isAdmin, async (req, res) => Client.update({ req, res }));

// Users
router.route('/users').post(async (req, res) => User.create({ req, res }));
router.route('/users').get(JSONWebToken.validate, AuthController.isAdmin, async (req, res) => User.getAll({ req, res }));
router.route('/users/:user_id').get(JSONWebToken.validate, AuthController.isAdmin || AuthController.isAuth, async (req, res) => User.get({ req, res }));
router.route('/users/:user_id').put(JSONWebToken.validate, AuthController.isAdmin || AuthController.isAuth, async (req, res) => User.update({ req, res }));

// Permission
router.route('/permissions').post(JSONWebToken.validate, AuthController.isAdmin, async (req, res) => Permission.create({ req, res }));
router.route('/permissions').get(JSONWebToken.validate, AuthController.isAdmin, async (req, res) => Permission.getAll({ req, res }));
router.route('/permissions/:permission_id').get(JSONWebToken.validate, AuthController.isAdmin, async (req, res) => Permission.get({ req, res }));
router.route('/permissions/:permission_id').put(JSONWebToken.validate, AuthController.isAdmin, async (req, res) => Permission.update({ req, res }));

// Auth Token
router.route('/tokens').get(JSONWebToken.validate, AuthController.isAdmin, async (req, res) => Token.getAll({ req, res }));
router.route('/tokens/:token_id').get(JSONWebToken.validate, AuthController.isAdmin, async (req, res) => Token.get({ req, res }));
router.route('/tokens/:token_id').put(JSONWebToken.validate, AuthController.isAdmin, async (req, res) => Token.update({ req, res }));

// Login Session
router.route('/loginsessions').get(async (req, res) => LoginSession.getAll({ req, res }));
router.route('/loginsessions/:session_id').get(async (req, res) => LoginSession.get({ req, res }));

export default router;
