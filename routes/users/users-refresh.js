import express from 'express';
import jwt from 'jsonwebtoken';
// import { handleRefreshToken } from '../../controllers/auth/refresh';

const router = express.Router();

//POST /api/users/refresh
router.post('/', async (req, res) => {
  //the body of the refresh message contains the token
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(401).json({ error: 'Không có refresh token.' });
  }

  try {
    const payload = jwt.verify(refreshToken, process.env.REF_KEY);

    const newAccessToken = jwt.sign(
      { id: payload.id, username: payload.username, email: payload.email },
      process.env.JWT_KEY,
      { expiresIn: '1h' }
    );

    res.json({ accessToken: newAccessToken });
  } catch (err) {
    return res.status(403).json({ error: 'Refresh token không hợp lệ hoặc đã hết hạn.' });
  }
});

export default router;