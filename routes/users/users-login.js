import express from 'express';
import { loginUser } from '../../controllers/auth/login.js';

const router = express.Router();

/*
Expected Payload
{
    "username":"megan",
    "password":"123456"
}
*/

//POST /api/users/login
router.post('/', loginUser);

export default router;
