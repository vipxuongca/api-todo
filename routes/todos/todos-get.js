import express from 'express';
import { verifyToken } from '../../controllers/auth/jwt-verify.js';
import TodoList from '../../models/todo-model.js';

const router = express.Router();

// GET /api/todos?page=1
router.get('/', verifyToken, async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 10;
  const skip = (page - 1) * limit;

  try {
    const todos = await TodoList.find({ userId: req.user.id })
      .sort({ createdAt: -1 }) // Optional: newest first
      .skip(skip)
      .limit(limit);

    const totalCount = await TodoList.countDocuments({ userId: req.user.id });

    res.json({
      page,
      totalPages: Math.ceil(totalCount / limit),
      totalCount,
      todos
    });

  } catch (err) {
    res.status(500).send(err.message);
  }
});

export default router;
