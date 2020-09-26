import express from 'express';
import Client from './../api/client/client.controller';
import User from './../api/user/user.controller';
import Token from './../api/token/token.controller';
import Permission from './../api/permission/permission.controller';
import LoginSession from './../api/login_session/login_session.controller';
import Auth from './../api/auth/auth.controller';
import { JSONWebToken } from './../helpers';

const router = express.Router();

router.route('/status').get(async (req, res) => res.send('OK!'));

// Permission
// router.route('/permissions').post(JSONWebToken.validate, Auth.isAdmin, async (req, res) => Permission.create({ req, res }));
// router.route('/permissions').get(JSONWebToken.validate, Auth.isAdmin, async (req, res) => Permission.getAll({ req, res }));
// router.route('/permissions/:permission_id').get(JSONWebToken.validate, Auth.isAdmin, async (req, res) => Permission.get({ req, res }));
// router.route('/permissions/:permission_id').put(JSONWebToken.validate, Auth.isAdmin, async (req, res) => Permission.update({ req, res }));

// // Auth Token
// router.route('/tokens').get(JSONWebToken.validate, Auth.isAdmin, async (req, res) => Token.getAll({ req, res }));
// router.route('/tokens/:token_id').get(JSONWebToken.validate, Auth.isAdmin, async (req, res) => Token.get({ req, res }));
// router.route('/tokens/:token_id').put(JSONWebToken.validate, Auth.isAdmin, async (req, res) => Token.update({ req, res }));

// // Login Session
// router.route('/loginsessions').get(async (req, res) => LoginSession.getAll({ req, res }));
// router.route('/loginsessions/:session_id').get(async (req, res) => LoginSession.get({ req, res }));

export default router;
