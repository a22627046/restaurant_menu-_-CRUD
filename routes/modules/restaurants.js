// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
// 引用 Restaurant model
const Restaurant = require('../../models/restaurant')

router.get('/sort', (req, res) => {
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


router.get('/search', (req, res) => {
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


router.get('/new', (req, res) => {
  return res.render('new')
})

router.post('/', (req, res) => {
  const { name, name_en, category, image, location, phone, google_map, rating, description } = req.body
  return Restaurant.create({ name, name_en, category, image, location, phone, google_map, rating, description })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})


router.get('/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('detail', { restaurant }))
    .catch(error => console.log(error))
})

router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('edit', { restaurant }))
    .catch(error => console.log(error))
})

router.put('/:id', (req, res) => {
  const id = req.params.id
  const { name, name_en, category, image, location, phone, google_map, rating, description } = req.body
  return Restaurant.findById(id)
    .then(restaurant => {
      restaurant.name = name
      restaurant.name_en = name_en
      restaurant.category = category
      restaurant.image = image
      restaurant.location = location
      restaurant.phone = phone
      restaurant.google_map = google_map
      restaurant.rating = rating
      restaurant.description = description


      return restaurant.save()
    })
    .then(() => res.redirect(`/restaurants/${id}/edit`))
    .catch(error => console.log(error))
})


router.delete('/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// 匯出路由器
module.exports = router