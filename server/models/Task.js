const mongoose = require('mongoose');

const taskSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        title: {
            type: String,
            required: [true, 'Please add a text value'],
        },
        description: {
            type: String,
        },
        status: { // e.g., 'pending', 'completed'
            type: String,
            default: 'pending'
        }
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Task', taskSchema);
