require('dotenv').config()

module.exports = {
  PORT: process.env.PORT || 3300,
  SECRET_KEY: process.env.SECRET_KEY || 'default',
}
