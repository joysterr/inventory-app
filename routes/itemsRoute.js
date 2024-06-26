const express = require('express')
const router = express.Router()

const Item = require('../controllers/itemsController')

// GET items list
router.get('/', Item.items_list_get)

// GET new item form
router.get('/new', Item.item_create_get)

// POST new item 
router.post('/new', Item.item_create_post)

// GET manage items list
router.get('/edit', Item.items_edit_get)

// GET edit item form
router.get('/edit/:id', Item.item_edit_item_get)

// POST edit item form
router.post('/edit/:id', Item.item_edit_item_post)

// POST delete an item
router.post('/delete/:id', Item.item_delete_post)

// GET item by id
router.get('/:id', Item.item_get)

module.exports = router