import express from 'express';
import { logoutUser } from '../../controllers/auth/logout.js';

const router = express.Router();

/*
Expected payload: include refreshtoken

{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjBjYThiNTliLThjY2UtNDc2ZC1iYWFmLWQ3YzZmOGQ4ODg5YSIsImlhdCI6MTc1Mjc0MjcyNiwiZXhwIjoxNzUzMzQ3NTI2fQ.WVvGID97vDsNn08hR02ImfKeExRMSPIpZyPybcmW95M"
}

*/

// Post /api/users/logout
router.post('/', logoutUser);

export default router;
