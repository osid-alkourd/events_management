const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Event = require('../models/events')
const Hall = require('../models/halls')
//const app = express()
const verifyToken = require('../middleware/verifyToken')

//app.use(verifyToken)

// fetch all events
router.get('/' ,  verifyToken   , async (req , res) => {
    try {
        const events = await Event.find()
        res.json(events)
    } catch(err){
        res.status(500).json({message: err.message})
    }
})

// add new event
router.post('/' ,  verifyToken  ,async (req , res) => {
    // const start_time = new Date().setHours(req.body.startTime)
    // const end_time = new Date().setHours(req.body.endTime) 
     const start_time = req.body.startTime;
     const end_time = req.body.endTime
    const date =   new Date(req.body.Date) 
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
                 const checkEvent = await Event.findOne({
                    Date: date , 
                    startTime: {$gte: start_time} ,
                    endTime:{$lte: end_time}
                    });
                    if(checkEvent)  return res.status(422).json({ message: "The time not suite" });

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
router.put('/:id' ,  verifyToken   , async (req , res) => {
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
router.delete('/:id', verifyToken , async (req, res) => {
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

 // Event.findOne({
                //     Date: date , 
                //     startTime: {$gte: req.body.start_time } ,
                //     endTime:{$lte: req.body.end_time}
                //     }).then((event) => {
                //     if(event) return res.status(422).json({ message: "The time not suite" });
                //   }).catch(err => {
                //     return res.status(500).json({ message: "Internal server error" });
                //  });