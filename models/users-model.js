import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true }, // UUID
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true }
},
  //exclude the version key
  {
    versionKey: false
  });

export default mongoose.model('User', userSchema);
