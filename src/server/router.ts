import express from 'express';
import Client from './../api/client/client.controller';

const router = express.Router();

router.route('/test').get(async (req, res) => res.status(200).json({ message: `Success!` }));

// Clients
router.route('/clients').post(async (req, res) => Client.create({ req, res }));
router.route('/clients').get(async (req, res) => Client.getAll({ req, res }));
router.route('/clients/:client_id').get(async (req, res) => Client.get({ req, res  }));
router.route('/clients/:client_id').put(async (req, res) => Client.update({ req, res }));

export default router;
