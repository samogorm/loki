import express from 'express';

const router = express.Router();

router.route('/status').get(async (req, res) => res.send('OK!'));

export default router;
