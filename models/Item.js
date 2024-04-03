const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ItemSchema = new Schema({
    name: { type: String, required: true, minLength: 3, maxLength: 30 },
    description: { type: String, required: true, maxLength: 100 },
    category: { type: Schema.ObjectId, ref: 'Category', required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true }
})

ItemSchema.virtual('url').get(function () {
    return '/items/' + this._id
})

module.exports = mongoose.model('Item', ItemSchema)