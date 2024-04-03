const handler = require('express-async-handler')

const Item = require('../models/Item')
const Category = require('../models/Category')

// GET all items
exports.items_list_get = handler(async (req, res, next) => {
    const allItems = await Item.find({}, "name category stock price")
        .sort({ category: 1 })
        .populate("category")
        .exec()

    res.render('menu', { 
        title: "Today's Menu",
        items: allItems 
    })
})