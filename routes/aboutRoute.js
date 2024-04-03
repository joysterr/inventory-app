const express = require('express')
const router = express.Router()

const About = require('../controllers/aboutController')

// GET about page
router.get('/', About.about_get)

module.exports = router