const express = require('express')
const router = express.Router()

const Item = require('../controllers/itemsController')

// GET items list
router.get('/', Item.items_list_get)

module.exports = router