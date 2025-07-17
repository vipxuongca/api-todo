import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserModel from '../../models/users-model.js';

const router = express.Router();
const tokenExpiry = '1h';

// POST /api/users/login
router.post('/', async (req, res) => {
  try {
    const { username, password } = req.body;
    const jwtSecret = process.env.JWT_KEY;
    // 1. Find user by username
    const user = await UserModel.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: 'Tên đăng nhập hoặc mật khẩu không đúng.' });
    }

    // 2. Compare password
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ error: 'Tên đăng nhập hoặc mật khẩu không đúng.' });
    }

    // 3. Generate JWT
    // console.log(jwtSecret);
    const token = jwt.sign(
      { id: user.id, username: user.username, email: user.email },
      jwtSecret,
      { expiresIn: tokenExpiry }
    );

    console.log('Đăng nhập thành công. Người dùng: ', user.username);

    // 4. Return token and user info
    res.json({
      message: 'Đăng nhập thành công.',
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email
      }
    });

  } catch (err) {
    console.error(`Lỗi xảy ra khi "${user.username}" đăng nhập:`, err);
    res.status(500).json({ error: 'Đăng nhập thất bại.' });
  }
});

export default router;
