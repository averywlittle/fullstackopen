const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogPosts) => {
    const reducer = (sum, item) => {
        return sum + item.likes
    }

    return blogPosts.length === 0
        ? 0
        : blogPosts.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
    if (blogs[0].likes === null) {
        console.log('blogs[0] doesnt have likes')
        return 0
    }

    const reducer = (prev, curr) => prev.likes > curr.likes ? prev : curr

    return blogs.length === 0
        ? 0
        : blogs.reduce(reducer)
}

const mostBlogs = (blogs) => {
    if (blogs[0].likes === null) {
        console.log('blogs[0] doesnt have likes')
        return 0
    }

    const reducer = (prev, curr) => prev.likes > curr.likes ? prev : curr

    return blogs.length === 0
        ? 0
        : blogs.reduce(reducer)
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}