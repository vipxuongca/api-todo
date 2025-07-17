import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import UserModel from '../../models/users-model.js';
import validator from 'validator';

const router = express.Router();
const saltRounds = 10;

/*
Expected payload
{
    "username":"megan",
    "password":"123456",
    "email":"megan@gmail.com"
}
*/

// POST /api/users/register
router.post('/', async (req, res) => {

  try {
    const { username, password, email } = req.body;

    //email check
    if (!validator.isEmail(email)) {
      return res.status(400).json({ error: 'Email không hợp lệ!' });
    }

    //check duplication
    const existingUser = await UserModel.findOne({
      $or: [{ username }, { email }]
    });

    if (existingUser) {
      return res.status(409).json({ error: 'Username hoặc Email đã tồn tại.' });
    }

    //hashing
    console.log('Hashing password...');
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUserID = uuidv4();

    //save user
    const newUser = new UserModel(
      {
        userid: newUserID,
        username,
        password: hashedPassword,
        email
      }
    );

    console.log(`this is the detail being processed:${newUser}`);

    await newUser.save();

    console.log('Register success');
    console.log(newUser);

    res.json({
      message: "Đăng ký thành công! Thông tin đăng ký: ",
      user: newUser
    });
  } catch (err) {
    res.status(500).json(
      {
        error: "Đăng ký thất bại."
      }
    );
  }
});

export default router;
