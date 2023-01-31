const express = require('express')
const breads = express.Router()
const Bread = require('../models/bread.js')

// ---INDEX---
// GET
breads.get('/', async(req, res) => {
  const foundBreads = await Bread.find()
  // console.log('🚀 ~ file: breads_controller.js:9 ~ breads.get ~ foundBreads', foundBreads)
  res.render('index', {
      breads: foundBreads,
      title: 'Index Page',
    });
});


// CREATE
breads.post('/', (req, res) => {
  if(!req.body.image) {
      req.body.image = undefined 
  }
  if(req.body.hasGluten === 'on') {
    req.body.hasGluten = true
  } else {
    req.body.hasGluten = false
  }
  Bread.create(req.body).then(() => res.redirect('/breads')).catch(res.send('Rejected!'))
})


// ---NEW---
// GET
breads.get('/new', (req, res) => {
  res.render('new')
})

// EDIT
breads.get('/:id/edit', async(req, res) => {
  const bread = await Bread.findById(req.params.id)
  res.render('edit', {
    bread: bread
  })
})

// ---SHOW--- 
// GET
breads.get('/:id', (req, res) => {
  // Breads Part 7 wanted me to change :arrayIndext to /:id ------
  Bread.findById(req.params.id).then(foundBread => {
    const bakedBy = foundBread.getBakedBy() 
        console.log(bakedBy)
      res.render('show', { bread: foundBread })
    })
    .catch(err => {
      res.send('404')
    })
})

// BONUS Doesn't work
breads.get('/data/seed', (req, res) => {
  Bread.insertMany([breadSeed])
    .then(createdBreads => {
      res.redirect('/breads')
    })
})

// UPDATE
breads.put('/:id', async(req, res) => {
  if(req.body.hasGluten === 'on'){
    req.body.hasGluten = true
  } else {
    req.body.hasGluten = false
  }
  await Bread.findByIdAndUpdate(req.params.id, req.body, { new: true }) 
    .then(updatedBread => {
      console.log(updatedBread) 
      res.redirect(`/breads/${req.params.id}`) 
    })
})


// DELETE
breads.delete('/:id', async(req, res) => {
  await Bread.findByIdAndDelete(req.params.id) 
    .then(deletedBread => { 
      res.status(303).redirect('/breads')
    })
})

module.exports = breads
