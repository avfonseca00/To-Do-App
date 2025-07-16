const mongoose = require('mongoose')

const ListSchema = new mongoose.Schema({
    title: String,
    userId: String,
    workspaceId: String,
},
{
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.model('lists', ListSchema)