// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
// 引用 Restaurant model
const Restaurant = require('../../models/restaurant')

router.get('/', (req, res) => {
  const sortList = req.query.sort

  if (sortList === 'asc') {
    return Restaurant.find()
      .lean()
      .sort({ name: 'asc' })
      .then(restaurants => res.render('index', { restaurants }))
      .catch(error => console.error(error))
  } if (sortList === 'desc') {
    return Restaurant.find()
      .lean()
      .sort({ name: 'desc' })
      .then(restaurants => res.render('index', { restaurants }))
      .catch(error => console.error(error))
  } if (sortList === 'category') {
    return Restaurant.find()
      .lean()
      .sort({ category: 'asc' })
      .then(restaurants => res.render('index', { restaurants }))
      .catch(error => console.error(error))
  } if (sortList === 'location') {
    return Restaurant.find()
      .lean()
      .sort({ location: 'asc' })
      .then(restaurants => res.render('index', { restaurants }))
      .catch(error => console.error(error))
  }
})

// 匯出路由器
module.exports = router