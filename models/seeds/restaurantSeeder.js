const bcrypt = require('bcryptjs')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const db = require('../../config/mongoose')
const Restaurant = require('../restaurant')
const restaurantList = require('./restaurant.json')
const User = require('../user')

const SEED_USER = [
  {
    email: 'user1@example.com',
    password: '12345678'
  },
  {
    email: 'user2@example.com',
    password: '12345678'
  }
]


db.once('open', () => {
  SEED_USER.forEach((seedUser, index) => {
    bcrypt
      .genSalt(10)
      .then(salt => bcrypt.hash(seedUser.password, salt))
      .then(hash => User.create({
        name: seedUser.name,
        email: seedUser.email,
        password: hash
      }))
      .then(user => {
        const userId = user._id
        return Promise.all(Array.from(
          { length: 3 },
          (_, i) => Restaurant.create({ ...restaurantList.results[(i + (index * 3))], userId })
        ))
      })
      .then(() => {
        console.log('done.')
        process.exit()
      })
  })
})