// environment
import dotenv from 'dotenv';
dotenv.config();

//tools
import express from 'express';
import bodyParser from 'body-parser';

//modules
import connectDB from './config/db.js'

//routing modules
// routing for user
import userMeRoutes from './routes/users/users-me.js';
import userRegisterRoutes from './routes/users/users-register.js';
import userLoginRoutes from './routes/users/users-login.js';
import userRefreshRoute from './routes/users/users-refresh.js';

// routing for todo
import todoGetRoutes from './routes/todos/todos-get.js';
import todoCreateRoutes from './routes/todos/todos-post.js';
import todoPutRoutes from './routes/todos/todos-put.js';
import todoDeleteRoutes from './routes/todos/todos-delete.js';

//initialisation

const app = express();
const PORT = process.env.PORT || 5000;
connectDB();

// use json for the whole application, this automatically parse JSON into objects
app.use(bodyParser.json()); 


// Routes listing
//users
app.use('/api/users/me', userMeRoutes);
app.use('/api/users/register', userRegisterRoutes);
app.use('/api/users/login', userLoginRoutes);
app.use('/api/users/refresh', userRefreshRoute);

//todos
app.use('/api/todos/', todoGetRoutes);
app.use('/api/todos/create', todoCreateRoutes);
app.use('/api/todos/update', todoPutRoutes);
app.use('/api/todos/delete', todoDeleteRoutes);

//Routes and Semantic handling

app.get('/api', (req, res) => {
  console.log("Testing the GET from homepage success");
  res.send('Hello from homepage');
});

app.post('/api', (req, res) => {
  console.log('someone just sent a post request');
  console.log(req.body)
  res.send("thank you for your message");
})

app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`));