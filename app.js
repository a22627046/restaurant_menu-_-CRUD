const express = require('express')
const app = express()
const port = 3000

const exphbs = require('express-handlebars')
const Restaurant = require('./models/restaurant')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const helpers = require('handlebars-helpers')()

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/restaurant_menu_CRUD', { useNewUrlParser: true, useUnifiedTopology: true })
// 取得資料庫連線狀態
const db = mongoose.connection
// 連線異常
db.on('error', () => {
  console.log('mongodb error!')
})
// 連線成功
db.once('open', () => {
  console.log('mongodb connected!')
})



app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(methodOverride('_method'))

app.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.error(error))
})

app.get('/sort', (req, res) => {
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



app.get('/restaurants/new', (req, res) => {
  return res.render('new')
})

app.post('/restaurants', (req, res) => {
  const { name, name_en, category, image, location, phone, google_map, rating, description } = req.body
  return Restaurant.create({ name, name_en, category, image, location, phone, google_map, rating, description })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})


app.get('/restaurants/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('detail', { restaurant }))
    .catch(error => console.log(error))
})

app.get('/restaurants/:id/edit', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('edit', { restaurant }))
    .catch(error => console.log(error))
})

app.put('/restaurants/:id', (req, res) => {
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


app.delete('/restaurants/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})



app.get('/search', (req, res) => {
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


app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`)
})