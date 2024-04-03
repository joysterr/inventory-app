const express = require('express')
const router = express.Router()

const Menu = require('../controllers/menuController')

// GET menu page
router.get('/', Menu.menu_get)

module.exports = router