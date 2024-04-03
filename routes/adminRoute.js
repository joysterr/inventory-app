const express = require('express')
const router = express.Router()

const Admin = require('../controllers/adminController')

// GET admin page
router.get('/', Admin.admin_get)

module.exports = router