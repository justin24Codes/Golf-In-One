import mongoose from 'mongoose';
const { Schema } = mongoose;

const roundSchema = new Schema({
    course: {
        type: String,
        required: [true, 'Course is required']
    },
    numHoles: {
        type: String,
        required: [true, 'Number of Holes is required']
    },
    tee: {
        type: String,
        required: [true, 'Tee is required']
    },
    score: {
        type: Number,
        required: [true, 'Score is required']
    },
    date: {
        type: Date,
        timestamps: false,
        required: [true, 'Date is required']
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

export default mongoose.model('Round', roundSchema);