// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
// 引用 Restaurant model
const Restaurant = require('../../models/restaurant')
// 定義首頁路由
router.get('/', (req, res) => {
  const userId = req.user._id
  Restaurant.find({ userId })
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.error(error))
})

router.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const userId = req.user._id
  return Restaurant.find({ userId })
    .lean()
    .then(restaurantList =>
      restaurantList.filter(restaurant => {
        const name = restaurant.name.toLowerCase().includes(keyword.toLowerCase())
        const category = restaurant.category.includes(keyword)
        return (name || category)
      })
    )
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.log(error))
})

router.get('/sort', (req, res) => {
  const sortList = req.query.sort
  const userId = req.user._id
  if (sortList === 'asc') {
    return Restaurant.find({ userId })
      .lean()
      .sort({ name: 'asc' })
      .then(restaurants => res.render('index', { restaurants }))
      .catch(error => console.error(error))
  } if (sortList === 'desc') {
    return Restaurant.find({ userId })
      .lean()
      .sort({ name: 'desc' })
      .then(restaurants => res.render('index', { restaurants }))
      .catch(error => console.error(error))
  } if (sortList === 'category') {
    return Restaurant.find({ userId })
      .lean()
      .sort({ category: 'asc' })
      .then(restaurants => res.render('index', { restaurants }))
      .catch(error => console.error(error))
  } if (sortList === 'location') {
    return Restaurant.find({ userId })
      .lean()
      .sort({ location: 'asc' })
      .then(restaurants => res.render('index', { restaurants }))
      .catch(error => console.error(error))
  }
})

// 匯出路由器
module.exports = router