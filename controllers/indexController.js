const handler = require('express-async-handler')

exports.index_get = handler(async (req, res, next) => {
    res.send('Index Page')
})