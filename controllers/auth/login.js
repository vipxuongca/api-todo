import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../../models/users-model.js';
import RefreshToken from '../../models/refresh-model.js';

const tokenExpiry = '1h';
const maxRefreshToken = 3;

export const loginUser = async (req, res) => {
  const { username, password } = req.body;
  const jwtSecret = process.env.JWT_KEY;
  const refreshSecret = process.env.REF_KEY;

  try {
    const currentUser = await User.findOne({ username });

    if (!currentUser) {
      return res.status(401).json({
        error: `Không tồn tại người dùng với tên ${username}`
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, currentUser.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ error: 'Mật khẩu không đúng.' });
    }

    //count tokens
    const existingTokens = await RefreshToken.find({ userId: currentUser.userid }).sort({ createdAt: 1 });

    // If over limit, remove the oldest
    if (existingTokens.length >= maxRefreshToken) {
      const oldestToken = existingTokens[0];
      await RefreshToken.deleteOne({ _id: oldestToken._id });
      console.log("Quá giới hạn 3 token, xóa token cũ nhất.");
    }

    // sign the token
    const token = jwt.sign(
      {
        id: currentUser.userid,
        username: currentUser.username,
        email: currentUser.email
      },
      jwtSecret,
      { expiresIn: tokenExpiry }
    );

    const refreshToken = jwt.sign({ id: currentUser.userid }, refreshSecret, { expiresIn: '7d' });
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);

    await RefreshToken.create({
      token: hashedRefreshToken,
      userId: currentUser.userid,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    });

    console.log('Đăng nhập thành công. Người dùng:', currentUser.username);

    res.json({
      message: 'Đăng nhập thành công. Sau đây là thông tin đăng nhập:',
      token,
      refreshToken,
      currentUser: {
        userid: currentUser.id,
        username: currentUser.username,
        email: currentUser.email
      }
    });

  } catch (err) {
    console.error(`Lỗi xảy ra khi "${username}" đăng nhập:`, err);
    res.status(500).json({ error: 'Đăng nhập thất bại.' });
  }
};
