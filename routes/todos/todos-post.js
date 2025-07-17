import express from 'express';

const router = express.Router();

const todos = [
  {
    title: "to the chores",
    job: "sample",
    time_days: 30
  }
]

// these routes starts with api/todos
router.post('/', (req, res) => {
  console.log(todos);
  res.send(todos);
});

// router.post('/', (req, res) => {
  
// })

export default router;