// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
// 引用 Restaurant model
const Restaurant = require('../../models/restaurant')

router.get('/', (req, res) => {
  const keyword = req.query.keyword
  return Restaurant.find()
    .lean()
    .then(restaurantList =>
      restaurantList.filter(restaurant => {
        const name = restaurant.name.toLowerCase().includes(keyword.toLowerCase())
        const category = restaurant.category.includes(keyword)
        return (name || category)
      })
    )
    .then(restaurants => res.render('index', { restaurants: restaurants }))
    .catch(error => console.log(error))
})

// 匯出路由器
module.exports = router