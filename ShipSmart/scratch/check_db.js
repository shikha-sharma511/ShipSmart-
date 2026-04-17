const mongoose = require('mongoose');
require('dotenv').config({ path: '../.env' });

const UserSchema = new mongoose.Schema({
  email: String,
  role: String
});
const User = mongoose.model('User', UserSchema);

async function check() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to DB');
    const users = await User.find({}, 'email role');
    console.log('Users in DB:');
    users.forEach(u => console.log(`${u.email}: ${u.role}`));
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

check();
