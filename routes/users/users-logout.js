await RefreshToken.deleteOne({ userId: payload.id });
res.clearCookie('refreshToken');
