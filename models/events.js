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
        type: Number , 
        required: true ,  
        max: 24 , 
        min: 1
    } , 
    
    endTime: {
        type: Number , 
        required: true , 
        max: 24 , 
        min:1
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




/*
start     end
2          3
if(... >= 2 and .... <=3 ) // fail

*/