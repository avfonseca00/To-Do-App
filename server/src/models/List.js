const mongoose = require('mongoose')

const ListSchema = new mongoose.Schema({
    title: String,
    userId: Number,
    workspaceId: Number,
},
{
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.model('lists', ListSchema)