import express from 'express';

const router = express.Router();

const todos = [
  {
    title: "finish the chores",
    job: "sample",
    time_days: 30
  }
]

// these routes starts with api/todos
router.put('/', (req, res) => {
  console.log(todos);
  res.send(todos);
});

export default router;