require('dotenv').config()

const PORT = process.env.PORT
let MONGODB_URI = process.env.MONGODB_URI
let SECRET = process.env.SECRET

if (process.env.NODE_ENV === 'test') {
    MONGODB_URI = process.env.TEST_MONGO_URI
}

module.exports = {
    MONGODB_URI,
    PORT,
    SECRET
}