const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Event = require('../models/events')
const Hall = require('../models/halls')

// fetch all events
router.get('/' , async (req , res) => {
    try {
        const events = await Event.find()
        res.json(events)
    } catch(err){
        res.status(500).json({message: err.message})
    }
})

// add new event
router.post('/' , async (req , res) => {
    const start_time = new Date().setHours(req.body.startTime)
    const end_time = new Date().setHours(req.body.endTime) 
    const date = req.body.Date 
    const event = new Event({
       name: req.body.name , 
       attendeesNumber: req.body.attendeesNumber ,
       hallId: req.body.hallId ,
       description: req.body.description ,
       Date: date,
       startTime: start_time  , 
       endTime: end_time  
    })
    try{
        let hallId = new mongoose.Types.ObjectId(req.body.hallId);
        const hall = await Hall.findById(hallId)
        if(hall){
            if(hall.absorptiveCapacity >= req.body.attendeesNumber){
                
               // let checkEvent = Event.findOne({Date: date , startTime: start_time})
                const newEvent = await  event.save();
                return res.status(201).json(newEvent)
                
            }
            return res.status(422).json({ message: "The hall not suite" })
               
        }
        return res.status(404).json({ message: "The hall not found" })
    }catch(err) {
        res.status(400).json({ message: err.message})
    }
})



// update specific event
router.put('/:id' , async (req , res) => {
    const id = req.params.id 
    const event = await Event.findById(id)
    let hallId = new mongoose.Types.ObjectId(req.body.hallId);
    const hall = await Hall.findById(hallId)
    try{
        if(event){
            if(hall){
                if(hall.absorptiveCapacity >= req.body.attendeesNumber){
                   const updatedEvent = await  Event.findByIdAndUpdate(id , req.body, {new:true})
                    return res.status(201).json(updatedEvent)  
                }
                return res.status(422).json({ message: "The hall not suite" })
            }
            return res.status(404).json({ message: "The hall not found" })
        }
        return res.status(404).json({ message: "The event not found" })
     } catch(err){
        res.status(400).json({ message: err.message})
     }
})


// delete event
router.delete('/:id', async (req, res) => {
    try {
        const event = await Event.findByIdAndDelete(req.params.id)
        if(!event){
            return res.status(404).json({message: "cannot find this event" })
        }
        return res.status(200).json({ message: 'Deleted event' })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
  })

module.exports = router