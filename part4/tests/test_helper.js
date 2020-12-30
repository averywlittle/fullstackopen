const config = require('../utils/config')
const Blog = require('../models/blog')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


const initialBlogs = [
    {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Hello',
        author: 'Avery W. Little',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
      },
      {
        _id: '5a422aa71b54a676234d17f9',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 7,
        __v: 0
      },
      {
        _id: '5a422aa71b54a676234d17f3',
        title: 'Guten tag',
        author: 'Summer S. Varner',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 4,
        __v: 0
      }
]

const nonExistingId = async () => {
  const blog = new Blog({
    _id: '5a422aa71b54a676234d17f1',
    title: 'Guten tag',
    author: 'Summer S. Varner',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 4,
    __v: 0
  })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

const insertUser = async body => {
    
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(body.password, saltRounds);

    const user = new User({
      username: body.username,
      name: body.name,
      passwordHash,
      blogs: []
    });

    return user.save();
}

const getToken = async credentials => {
    
    const user = await User.findOne({ username: credentials.username });
    const passwordCorrect =
      user === null
        ? false
        : await bcrypt.compare(credentials.password, user.passwordHash);

    if (!(user && passwordCorrect)) {
      throw new Error('invalid user or password');
    }

    const userForToken = {
      username: user.username,
      id: user._id
    };

    const token = jwt.sign(userForToken, config.SECRET);

    return token;
}

module.exports = {
  initialBlogs, 
  nonExistingId, 
  blogsInDb,
  usersInDb,
  insertUser,
  getToken
}