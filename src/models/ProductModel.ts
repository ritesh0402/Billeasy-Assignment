import mongoose, { Schema } from "mongoose";
const productSchema = new Schema({
   name: String,
   description: String,
   category: String,
   price: Number,
   available: { type: Boolean, default: true },
   created_at: { type: Date, default: Date.now },
   approval_code: { type: String }
});

export default mongoose.model('Product', productSchema);