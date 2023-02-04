const express = require('express')
const breads = express.Router()
const Bread = require('../models/bread.js')
// somewhere at the top with the other dependencies 
const Baker = require('../models/baker.js')

// Index:
breads.get('/', async (req, res) => {
  const foundBakers = await Baker.find().lean() 
  const foundBreads = await Bread.find().limit(12).lean() 
  res.render('index', {
    breads: foundBreads,
    bakers: foundBakers,
    title: 'Index Page'
  })
})


// CREATE
breads.post('/', async(req, res) => {
  if(!req.body.image) {
      req.body.image = undefined 
  }
  if(req.body.hasGluten === 'on') {
    req.body.hasGluten = true
  } else {
    req.body.hasGluten = false
  }
  await Bread.create(req.body)
  res.redirect('/breads')
})

// ---NEW---
// GET
breads.get('/new', async(req, res) => {
  foundBakers = await Baker.find()
          res.render('new', {
              bakers: foundBakers
          })
    })

// EDIT
breads.get('/:id/edit', (req, res) => {
  Baker.find()
    .then(foundBakers => {
        Bread.findById(req.params.id)
          .then(foundBread => {
            res.render('edit', {
                bread: foundBread, 
                bakers: foundBakers 
            })
          })
    })
})

// SHOW
breads.get('/:id', (req, res) => {
  Bread.findById(req.params.id)
      .populate('baker')
      .then(foundBread => {
        res.render('show', {
            bread: foundBread
        })
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
