import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    age: Number,
    address: String
});

const User = mongoose.model('User', userSchema);

export default User;