const express = require('express');
const { getUsers, createUser, getUserById, updateUser, deleteUser } = require('../controllers/userController')
const router = express.Router()

router.get('/', getUsers)
    .post('/', createUser)
    .get('/:id', getUserById)
    .put('/:id', updateUser)
    .delete('/:id', deleteUser)

module.exports = router