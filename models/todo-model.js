import mongoose from 'mongoose';

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  description: {
    type: String,
    default: ''
  },
  status: {
    type: Boolean,
    default: false
  },
  deadline: {
    type: Date
  }
}, {
  timestamps: true
});

export default mongoose.model('TodoList', todoSchema);