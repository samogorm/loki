import express from 'express';
import Client from './../api/client/client.controller';
import User from './../api/user/user.controller';

const router = express.Router();

router.route('/test').get(async (req, res) => res.status(200).json({ message: `Success!` }));

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

export default router;
