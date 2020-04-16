import express from 'express';

const router = express.Router();

router.route('/test').get(async (req, res) => res.status(200).json({ message: `Success!` }));

export default router;
