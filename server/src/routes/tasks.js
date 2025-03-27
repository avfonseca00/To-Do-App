const express = require('express');
const { getTasks, createTask, getTaskById, updateTask, deleteTask, getUserTasks, searchTask } = require('../controllers/taskController')
const router = express.Router()

router.get('/', getTasks)
    .post('/', createTask)
    .get('/search/:userId', searchTask)
    .get('/:id', getTaskById)
    .get('/user/:userId', getUserTasks)
    .put('/:id', updateTask)
    .delete('/:id', deleteTask)

module.exports = router