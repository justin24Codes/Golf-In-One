import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
    name: String,
    email: {
        type: String
    },
    password: String
});

export default mongoose.model('User', userSchema);