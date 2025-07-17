import express from 'express';
import { verifyToken } from '../../controllers/auth/jwt-verify.js';
import TodoList from '../../models/todo-model.js';

const router = express.Router();

// PUT /api/todos/update
/*
Expected payload
{
  "todoId":"6878c7175b6b9d957bc5a874",
  "title":"sample",
  "description":"finish the audit of company XYZ for the annual report",
  "status":true,
  "deadline":"YYYY-MM-DD"
}
*/
router.put('/', verifyToken, async (req, res) => {
  try {
    const { todoId, title, description, status, deadline } = req.body;

    if (!todoId || !title) {
      return res.status(400).json({ error: 'cần cả ID và title của Công việc' });
    }

    const updatedTodo = await TodoList.findOneAndUpdate(
      { _id: todoId, userId: req.user.id },
      { title, description, status, deadline }, //here are the parameters to update
      { new: true, runValidators: true }
    );

    console.log(updatedTodo);

    if (!updatedTodo) {
      return res.status(404).json({ error: 'Không tìm thấy Công việc' });
    }

    res.status(200).json(updatedTodo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
