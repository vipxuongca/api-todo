import mongoose from 'mongoose';
import slugify from 'slugify';

const todoSchema = new mongoose.Schema({
  userId: {
    type: String,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  slug: {
    type: String,
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

// Generate slug
todoSchema.pre('save', async function (next) {
  if (!this.isModified('title')) return next();

  let baseSlug = slugify(this.title, { lower: true, strict: true });
  let slug = baseSlug;
  let counter = 1;

  // Ensure slug uniqueness
  while (await mongoose.models.TodoList.findOne({ slug })) {
    slug = `${baseSlug}-${Date.now()}`;
    counter++;
  }

  this.slug = slug;
  next();
});

export default mongoose.model('TodoList', todoSchema);
