import express from 'express';
import { logoutUser } from '../../controllers/auth/logout.js';

const router = express.Router();

router.post('/', logoutUser);

export default router;
