const mongoose = require('mongoose');

const conversationSchema = new mongoose.Schema(
    {
        creator: {
            id: mongoose.Schema.Types.ObjectId,
            name: String,
            avatar: String,
        },
        participant: {
            id: mongoose.Schema.Types.ObjectId,
            name: String,
            avatar: String,
        },
        last_updated: {
            type: Date,
            default: Date.now(),
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Conversations', conversationSchema);