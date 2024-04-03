const handler = require('express-async-handler')

exports.about_get = handler(async (req, res, next) => {
    res.render('about', { title: "About Us" })
})