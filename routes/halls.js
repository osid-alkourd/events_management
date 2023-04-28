const express = require('express')
const router = express.Router()
const Hall = require('../models/halls')

// Getting all halls
router.get('/' , async (req , res) => {
    try {
        const halls = await Hall.find()
        res.json(halls)
    } catch(err){
        res.status(500).json({message: err.message})
    }
})

// add new hall
router.post('/' , async (req , res) => {
    const hall = new Hall({
       name: req.body.name , 
       Building: req.body.building , 
       absorptiveCapacity: req.body.absorptiveCapacity 
    })
    try{
        const newHall = await  hall.save();
        res.status(201).json(newHall)
    }catch(err) {
        res.status(400).json({ message: err.message })
    }
})


// update specific hall
router.patch('/:id', getHall, async (req, res) => {
    if (req.body.name != null) {
      res.hall.name = req.body.name
    }
    if (req.body.building != null) {
      res.hall.Building = req.body.building
    }
    if (req.body.building != null) {
        res.hall.Building = req.body.building
      }

    if (req.body.absorptiveCapacity != null) {
      res.hall.absorptiveCapacity = req.body.absorptiveCapacity
    }
    try {
      const updatedHall = await res.hall.save()
      res.status(200).json(updatedHall)
    } catch (err) {
      res.status(400).json({ message: err.message })
    }
  })


// delete speocific hall
router.delete('/:id', async (req, res) => {
    try {
      const hall = await Hall.findByIdAndDelete(req.params.id)
      if(!hall){
        return res.status(404).json({message: "cannot find this hall" })
      }
      res.status(200).json({ message: 'Deleted hall' })
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  })

async function getHall(req , res , next) {
    let hall
    try {
        hall = await Hall.findById(req.params.id)
        if(hall == null) {
          return res.status(404).json({message: 'can not find selected hall'})
        }
    } catch(err) {
        return res.status(500).json({message: err.message})
    }
    res.hall = hall
    next()
 }
  
module.exports = router


