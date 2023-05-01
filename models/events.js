const mongoose = require('mongoose')
const eventsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
      },
    Date: {
        type: Date,
        required: true , 
    },
    attendeesNumber: {
         type: Number,
         required: true
    },

    hallId: {
       type: String , 
       required: true 
    } ,

    description: {
       type: String , 
       required: true
    } , 

    startTime: {
        type: Date , 
        required: true , 
    } , 
    
    endTime: {
        type: Date , 
        required: true , 
    } , 

    created_at: {
        type: Date,
        required: true,
        default: Date.now
      } , 

      updated_at: {
        type: Date,
        required: true,
        default: Date.now
      } , 
})

module.exports = mongoose.model('events',eventsSchema)