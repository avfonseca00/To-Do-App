const express = require('express');
const { getWorkspaces, createWorkspace, getWorkspaceById, updateWorkspace, deleteWorkspace } = require('../controllers/workspaceController')
const router = express.Router()

router.get('/', getWorkspaces)
    .post('/', createWorkspace)
    .get('/:id', getWorkspaceById)
    .put('/:id', updateWorkspace)
    .delete('/:id', deleteWorkspace)

module.exports = router