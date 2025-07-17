import express from 'express';
import { verifyToken } from '../../controllers/auth/jwt-verify.js';
import TodoList from '../../models/todo-model.js';

const router = express.Router();

// POST /api/todos/create
/*
Expected payload
{
  "title":"sample",
  "description":"finish the audit of company XYZ for the annual report",
  "status":true,
  "deadline":"YYYY-MM-DD"
}
*/
router.post('/', verifyToken, async (req, res) => {
  try {
    const { title, description, status, deadline } = req.body;

    if (!title) {
      return res.status(400).json({ error: 'Title is required' });
    }

    const todo = new TodoList({
      userId: req.user.id, // from JWT middleware
      title,
      description,
      status,
      deadline
    });

    console.log(todo);

    await todo.save();

    res.status(201).json(todo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
