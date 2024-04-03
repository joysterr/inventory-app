const handler = require('express-async-handler')

exports.menu_get = handler(async (req, res, next) => {
    res.render('menu', { title: "Today's Menu" })
})