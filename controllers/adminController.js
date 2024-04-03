const handler = require('express-async-handler')

exports.admin_get = handler(async (req, res, next) => {
    res.render('admin', { title: "Welcome Admin" })
})