const handler = require('express-async-handler')
const { body, validationResult } = require('express-validator')

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
        // item: null,
        allCategories: allCategories
    })
})

// CREATE new item
exports.item_create_post = [
    // sanitize
    body("itemName", "Name must not be empty")
        .trim()
        .isLength({ min: 3 })
        .escape(),
    body("itemDesc", "Description must not be empty")
        .trim()
        .isLength({ min: 1 })
        .escape(),
    body("itemPrice", "Price must not be empty")
        .trim()
        .isLength({ min: 1 })
        .escape(),
    body("itemStock", "Stock must not be empty")
        .trim()
        .isLength({ min: 1 })
        .escape(),
    body("itemCategory").escape(),

    handler(async (req, res, next) => {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            const allCategories = await Category.find().sort({ _id: 1 }).exec()

            res.render('item_form', {
                title: "Add New Item",
                allCategories: allCategories,
                errors: errors.array()
            })
        } else {
            const item = new Item({
                name: req.body.itemName,
                description: req.body.itemDesc,
                category: req.body.itemCategory,
                price: req.body.itemPrice,
                stock: req.body.itemStock,
            })

            await item.save()

            console.log("dev: successfully added", item.name)

            res.redirect(item.url)
        }
    })
]

// GET manage item list
exports.items_edit_get = handler(async (req, res, next) => {
    const allItems = await Item.find({}, "name category stock price")
        .sort({ category: 1 })
        .populate("category")
        .exec()

    res.render('item_edit', { items: allItems })
})

// GET udpate item form
exports.item_edit_item_get = handler(async (req, res, next) => {
    const editItem = await Item.findById(req.params.id)
        .populate('category')
        .exec()

    const allCategories = await Category.find()
        .sort({ _id: 1 })
        .exec()

    if (editItem === null) {
        return res.send('404: ITEM NOT FOUND')
    }

    res.render('item_form', {
        title: "Update Item",
        item: editItem,
        allCategories: allCategories
    })
})

// POST edited item 
exports.item_edit_item_post = [
    body("itemName", "Name must not be empty")
        .trim()
        .isLength({ min: 3 })
        .escape(),
    body("itemDesc", "Description must not be empty")
        .trim()
        .isLength({ min: 1 })
        .escape(),
    body("itemPrice", "Price must not be empty")
        .trim()
        .isLength({ min: 1 })
        .escape(),
    body("itemStock", "Stock must not be empty")
        .trim()
        .isLength({ min: 1 })
        .escape(),
    body("itemCategory").escape(),

    handler(async (req, res, next) => {
        const errors = validationResult(req)

        const item = new Item({
            _id: req.params.id,
            name: req.body.itemName,
            description: req.body.itemDesc,
            category: req.body.itemCategory,
            price: req.body.itemPrice,
            stock: req.body.itemStock,
        })

        if (!errors.isEmpty()) {
            const allCategories = await Category.find().sort({ _id: 1 }).exec()

            res.render('item_form', {
                title: "Add New Item",
                allCategories: allCategories,
                item: item,
                errors: errors.array()
            })
        } else {
            const updatedItem = await Item.findByIdAndUpdate(req.params.id, item, {})
            res.redirect('/items/' + updatedItem._id)
        }
    })
]

// DELETE an item
exports.item_delete_post = handler(async (req, res, next) => {
    const itemExists = await Item.findById(req.params.id).exec()
    if (!itemExists) {
        console.log('dev: item does not exist')
        res.redirect('/items/edit')
    } else {
        const deleteItem = await Item.findByIdAndDelete(req.params.id)
        console.log(`dev: item: ${itemExists.name} has been deleted successfully`)
        deleteItem && res.redirect('/items/edit')
    }
})