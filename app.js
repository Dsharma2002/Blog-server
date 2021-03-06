const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const Blog = require('./models/blog')
const { result } = require('lodash')
const { render } = require('express/lib/response')

// express app
const app = express()

// connect to mongoDB
const dbURL = 'mongodb+srv://divi2002:divyansh@node-start.mh15h.mongodb.net/Node-start?retryWrites=true&w=majority'
mongoose.connect(dbURL)
    .then((result) => app.listen(3000))
    .catch((err) => { console.log(err) })

// register view engine
app.set('view engine', 'ejs')

// morgan middleware use
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: true }))

// routes
app.get('/', (req, res) => {
    // res.sendFile('./views/index.html', { root: __dirname })
    res.redirect('/blogs')
})

app.get('/about', (req, res) => {
    // res.sendFile('./views/about.html', { root: __dirname })
    res.render('about', { title: 'About' })
})

// redirects
app.get('/about-us', (req, res) => {
    res.redirect('/about')
})

// blog routes
app.get('/blogs/create', (req, res) => {
    res.render('create', { title: 'Create' })
})

app.get('/blogs', (req, res) => {
    Blog.find().sort({ createdAt: -1 })
        .then((result) => {
            res.render('index', { title: 'All Blogs', blogs: result })
        }).catch((err) => {
            console.log(err)
        })
})

app.post('/blogs', (req, res) => {
    const blog = new Blog(req.body)

    blog.save()
        .then((result) => {
            res.redirect('/blogs')
        }).catch((err) => {
            console.log(err)
        })
})

app.get('/blogs/:id', (req, res) => {
    const id = req.params.id
    Blog.findById(id)
        .then((result) => {
            res.render('details', { title: 'Blog Details', blog: result })
        }).catch((err) => {
            console.log(err)
        })
})

app.delete('/blogs/:id', (req, res) => {
    const id = req.params.id
    Blog.findByIdAndDelete(id)
        .then((result) => {
            res.json({ redirect: '/blogs' })
        }).catch((err) => console.log(err))
})

// 404 use
app.use((req, res) => {
    res.status(404).render('404', { title: '404' })
})