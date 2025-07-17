import RefreshToken from '../../models/refresh-model.js';
import bcrypt from 'bcrypt';

export const logoutUser = async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(400).json({ error: 'Refresh token không tồn tại.' });
  }

  try {
    // Find and delete the stored hashed version
    const tokens = await RefreshToken.find();

    // Compare each hashed token to the one given
    // delete only the current log in one
    for (const tokenEntry of tokens) {
      const match = await bcrypt.compare(refreshToken, tokenEntry.token);
      if (match) {
        await RefreshToken.deleteOne({ _id: tokenEntry._id });
        return res.status(200).json({ message: 'Đăng xuất thành công.' });
      }
    }

    return res.status(400).json({ error: 'Refresh token không hợp lệ hoặc đã hết hạn.' });
  } catch (err) {
    console.error('Lỗi khi đăng xuất:', err);
    res.status(500).json({ error: 'Đăng xuất thất bại.' });
  }
};
