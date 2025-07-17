import express from 'express';
import User from '../../models/users-model.js';
import { verifyToken } from '../../controllers/auth/jwt-verify.js';

const router = express.Router();

router.get('/', verifyToken, async (req, res) => {
  try {
    const user = await User.findOne({ userid: req.user.id }, 'userid username email');
    res.json(user);

  } catch (err) {
    res.status(500).send(err.message);
  }
});

export default router;
