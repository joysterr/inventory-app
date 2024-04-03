const express = require('express')
const router = express.Router()

const Index = require('../controllers/indexController')

// GET index page
router.get('/', Index.index_get)

module.exports = router