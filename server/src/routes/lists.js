const express = require('express');
const { getLists, createList, getListById, updateList, deleteList } = require('../controllers/listController')
const router = express.Router()

router.get('/', getLists)
    .post('/', createList)
    .get('/:id', getListById)
    .put('/:id', updateList)
    .delete('/:id', deleteList)

module.exports = router