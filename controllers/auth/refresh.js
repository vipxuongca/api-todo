import jwt from 'jsonwebtoken';

const handleRefreshToken = async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    return res.status(401).json({ error: 'Không có refresh token.' });
  }

  try {
    const payload = jwt.verify(refreshToken, process.env.REF_KEY);

    const newAccessToken = jwt.sign(
      {
        id: payload.id,
        username: payload.username,
        email: payload.email
      },
      process.env.JWT_KEY,
      { expiresIn: '1h' }
    );

    res.json({ accessToken: newAccessToken });
  } catch (err) {
    return res.status(403).json({ error: 'Refresh token không hợp lệ hoặc đã hết hạn.' });
  }
};

export { handleRefreshToken };