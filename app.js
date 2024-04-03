const express = require('express')
const logger = require('morgan')
const mongoose = require('mongoose')

const indexRouter = require('./routes/indexRoute')
const adminRouter = require('./routes/adminRoute')
const menuRouter = require('./routes/menuRoute')
const aboutRouter = require('./routes/aboutRoute')

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
app.use('/', indexRouter)
app.use('/menu', menuRouter)
app.use('/about', aboutRouter)
app.use('/admin', adminRouter)

// server start
app.listen(port, () => {
    console.log(`dev: running on localhost:${port}`)
})