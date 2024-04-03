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

// GET an individual item
exports.item_get = handler(async (req, res, next) => {
    const item = await Item.findById(req.params.id)
        .populate("category")
        .exec()

    res.render('item', { item: item })
})

// GET new item form
exports.item_create_get = handler(async (req, res, next) => {
    const allCategories = await Category.find()
    .sort({ _id: 1 })
    .exec()

    res.render('item_form', {
        title: "Add New Item",
        item: null,
        allCategories: allCategories
    })
})

// CREATE new item
exports.item_create_post = handler(async (req, res, next) => {
    res.send('NEW ITEM CREATED!')
})