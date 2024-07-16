const mongoose = require('mongoose');
require('dotenv').config()
const { Schema } = mongoose;
const roleSchema = new Schema({
   name: { type: String, unique: true }
});
const userSchema = new Schema({
   name: String,
   email: { type: String, unique: true },
   role_id: { type: Schema.Types.ObjectId, ref: 'Role' },
   created_at: { type: Date, default: Date.now }
});
const userActivitySchema = new Schema({
   user_id: { type: Schema.Types.ObjectId, ref: 'User' },
   last_active: Date,
   is_active: { type: Boolean, default: true }
});
const customerSchema = new Schema({
   name: String,
   email: { type: String, unique: true },
   created_at: { type: Date, default: Date.now }
});
const orderSchema = new Schema({
   customer_id: { type: Schema.Types.ObjectId, ref: 'Customer' },
   total_amount: Number,
   created_at: { type: Date, default: Date.now }
});
const productSchema = new Schema({
   name: String,
   description: String,
   category: String,
   price: Number,
   available: { type: Boolean, default: true },
   created_at: { type: Date, default: Date.now }
});
const Role = mongoose.model('Role', roleSchema);
const User = mongoose.model('User', userSchema);
const UserActivity = mongoose.model('UserActivity',
   userActivitySchema);
const Customer = mongoose.model('Customer', customerSchema);
const Order = mongoose.model('Order', orderSchema);
const Product = mongoose.model('Product', productSchema);
mongoose.connect(process.env.MONGODB_URI, {
   useNewUrlParser: true,
   useUnifiedTopology: true
});
async function seedData() {
   await Role.deleteMany({});
   await User.deleteMany({});
   await UserActivity.deleteMany({});
   await Customer.deleteMany({});
   await Order.deleteMany({});
   await Product.deleteMany({});
   const roles = await Role.insertMany([
      { name: 'admin' },
      { name: 'user' },
      { name: 'guest' }
   ]);
   const users = await User.insertMany([
      {
         name: 'Admin User', email: 'admin@example.com', role_id:
            roles[0]._id
      },
      {
         name: 'Regular User', email: 'user@example.com', role_id:
            roles[1]._id
      },
      {
         name: 'Guest User', email: 'guest@example.com', role_id:
            roles[2]._id
      }
   ]);
   await UserActivity.insertMany([
      {
         user_id: users[0]._id, last_active: new Date(), is_active: true
      },
      {
         user_id: users[1]._id, last_active: new Date(), is_active: true
      },
      {
         user_id: users[2]._id, last_active: new Date(), is_active: false
      }
   ]);
   const customers = await Customer.insertMany([
      { name: 'Customer One', email: 'customer1@example.com' },
      { name: 'Customer Two', email: 'customer2@example.com' }
   ]);
   await Order.insertMany([
      { customer_id: customers[0]._id, total_amount: 100.00 },
      { customer_id: customers[0]._id, total_amount: 200.00 },
      { customer_id: customers[1]._id, total_amount: 300.00 }
   ]);
   await Product.insertMany([
      {
         name: 'Product One', description: 'Description One', category:
            'electronics', price: 500.00, available: true
      },
      {
         name: 'Product Two', description: 'Description Two', category:
            'home', price: 150.00, available: true
      }
   ]);
   mongoose.disconnect();
}
seedData().catch(err => console.error(err));