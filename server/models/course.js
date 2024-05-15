import mongoose from 'mongoose';
const { Schema } = mongoose;

const courseSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    par: {
        type: Number,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    tees: [
        {
            colour: String,
            rating: Number,
            slope: Number,
            length: Number,
            usedBy: String,
            allInfo: String
        }
    ]
});

export default mongoose.model('Course', courseSchema);