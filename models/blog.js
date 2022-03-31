const mongoose = require('mongoose')
const Schema = mongoose.Schema
// Schema defines the structure of the document
// we want to store inside of the database
const blogSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    snippet: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    }
}, { timestamps: true })

// Model
const Blog = mongoose.model('Blog', blogSchema)
module.exports = Blog