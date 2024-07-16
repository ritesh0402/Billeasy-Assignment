import mongoose, { Schema } from "mongoose";
const userSchema = new Schema({
   name: String,
   email: { type: String, unique: true },
   role: { type: String },
   active: { type: Boolean }
}, {
   timestamps: true
});

export default mongoose.model('User', userSchema);
