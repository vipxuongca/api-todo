import express from 'express';
import User from '../../models/users-model.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const users = await User.find({}, 'id username email'); // projection
    res.json(users);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

export default router;