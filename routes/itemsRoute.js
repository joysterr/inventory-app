const express = require('express')
const router = express.Router()

const Item = require('../controllers/itemsController')

// GET items list
router.get('/', Item.items_list_get)

// GET new item form
router.get('/new', Item.item_create_get)

// POST new item 
router.post('/new', Item.item_create_post)


// GET item by id
router.get('/:id', Item.item_get)

module.exports = router