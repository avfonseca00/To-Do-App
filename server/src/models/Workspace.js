const mongoose = require('mongoose')

const WorkspaceSchema = new mongoose.Schema({
    name: String,
    description: String,
},
{
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.model('workspaces', WorkspaceSchema)