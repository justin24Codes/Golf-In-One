import mongoose from 'mongoose';
const { Schema } = mongoose;

const teeSchema = new Schema({
    colour: String,
    rating: Number,
    slope: Number,
    length: Number,
    usedBy: String
});

export default mongoose.model('Tee', teeSchema);