const express = require('express')
const logger = require('morgan')
const mongoose = require('mongoose')

const app = express()
const port = 3000

// db
mongoose.connect(process.env.DB_URI)
    .then(console.log('dev: DB CONNECTED'))
    .catch(err => {
        console.error(err)
    })

// view engine
app.set('view engine', 'ejs')

// middleware
app.use(express.static('public'))
app.use(logger('dev'))
app.use(express.urlencoded({ extended: true }))

// routes


// server start
app.listen(port, () => {
    console.log(`dev: running on localhost:${port}`)
})