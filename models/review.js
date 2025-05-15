const mongoose = require('mongoose');

const { Schema } = mongoose; // ✅ Correct way to use Schema

const reviewSchema = new Schema({
    comment: {
        type: String,
        required: true
    },
    rating: {
        type: Number, // ✅ Use `Number`, not `number`
        min: 1,
        max: 5,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    author:{
        type: Schema.Types.ObjectId,
        ref: 'User',
    }
});

module.exports = mongoose.model("Review", reviewSchema);
