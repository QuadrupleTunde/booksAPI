// require mongoose: 
const mongoose = require('mongoose')
const { Schema } = mongoose 

// schema:
const bookSchema = new Schema({
    title: String,
    description: String,
    year: Number,
    quantity: Number,
    image: String
})

// model and export: 
const Books = mongoose.model('books', bookSchema)
module.exports = Books