const config = require('../utils/config')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', (request, response) => {
    Blog
      .find({})
      .then(blogs => {
        response.json(blogs)
      })
})
  
blogsRouter.post('/', async (request, response, next) => {
    const body = request.body
    const decodedToken = jwt.verify(request.token, config.SECRET)

    if (!request.token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
    } else {
        const user = await User.findById(decodedToken.id)
        console.log(user)

        const blog = new Blog({
          title: body.title,
          author: body.author,
          url: body.url,
          user: user
        })

        const savedBlog = await blog.save()
        user.blogs = user.blogs.concat(savedBlog._id)
        await user.save()
        
        response.status(201).json(savedBlog)
    }
})

blogsRouter.put('/:id', async (request, response, next) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    .then(updatedBlog => {
      response.json(updatedBlog.toJSON())
    })
    .catch(error => next(error))
})

blogsRouter.delete('/:id', async (request, response) => {
    const body = request.body
    const decodedToken = jwt.verify(request.token, process.env.SECRET)

    if (!request.token || !decodedToken.id) {

        return response.status(401).json({ error: 'token missing or invalid' })
    } 

    const blog = await Blog.findById(request.params.id)
    
    if (blog.user.toString() === decodedToken.id) {

        await Blog.findByIdAndRemove(request.params.id)
        response.status(204).end()
    } else {

        response.status(401).json({ error: 'only the creator of this data can remove it '})
    }
})

module.exports = blogsRouter