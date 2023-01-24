// DEPENDENCIES
const express = require('express')
const methodOverride = require('method-override')
const favicon = require('serve-favicon')
const path = require('path')

// CONFIGURATION
require('dotenv').config()
const PORT = process.env.PORT
const app = express()

// MIDDLEWARE
// setting up express view with jsx
app.set('views', __dirname + '/views')
app.set('view engine', 'jsx')
app.engine('jsx', require('express-react-views').createEngine())
app.use(express.urlencoded({extended: true}))
app.use(methodOverride('_method'))
app.use(favicon(path.join(__dirname,'public','images','favicon.ico')));


// ROUTES
app.get('/', (req, res) => {
    res.send('Welcome to an Awesome App about Breads')
  })
  
// Breads
  const breadsController = require('./controllers/breads_controller.js')
  app.use('/breads', breadsController)

// LISTEN
app.listen(PORT, () => {
  console.log('listening on port', PORT);
})

// 404 Page
app.get('*', (req, res) => {
  res.send('404')
})
