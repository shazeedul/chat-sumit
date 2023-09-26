const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter your name"],
        trim: true
    },
    email: {
        type: String,
        required: [true, "Please enter your email"],
        trim: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: [true, "Please enter your password"]
    },
    mobile: {
        type: String,
        required: [true, "Please enter your mobile number"],
        trim: true
    },
    avatar: {
        type: String
    },
    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user"
    }
}, { timestamps: true });

module.exports = mongoose.model("Users", userSchema);