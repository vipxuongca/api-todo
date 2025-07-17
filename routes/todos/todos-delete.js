import express from 'express';
import { verifyToken } from '../../controllers/auth/jwt-verify.js';
import TodoList from '../../models/todo-model.js';

const router = express.Router();
/*
No payload
*/
// DELETE /api/todos/:id
router.delete('/:id', verifyToken, async (req, res) => {
  //delete on todoId
  try {
    const todoId = req.params.id;

    const deletedTodo = await TodoList.findOneAndDelete({
      _id: todoId,
      userId: req.user.id
    });

    if (!deletedTodo) {
      return res.status(404).json({ error: 'Không tìm thấy công việc' });
    }

    res.status(200).json({ message: 'Xóa công việc thành công' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
