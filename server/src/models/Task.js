const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema({
    title: String,
    description: String,
    status: {
        type: String,
        default: "pending"
    },
    userId: mongoose.SchemaTypes.ObjectId
},
{
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.model('tasks', TaskSchema)