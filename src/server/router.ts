import express from 'express';
import ClientController from './../api/client/client.controller';

const router = express.Router();

router.route('/test').get(async (req, res) => res.status(200).json({ message: `Success!` }));

// Clients
router.route('/clients').post(async (req, res) => ClientController.create({ req, res }));
router.route('/clients').get(async (req, res) => ClientController.getAll({ req, res }));
router.route('/clients/:client_id').get(async (req, res) => ClientController.findById({ req, res  }));

export default router;
