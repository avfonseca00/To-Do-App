const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        unique: true
    },
    password: String,
    role: {
        type: ["user", "admin"],
        default: "user"
    }
},
{
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.model('users', UserSchema)