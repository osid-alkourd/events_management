const mongoose = require('mongoose')
const hallsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
      },
    Building: {
        type: String,
        required: true
    },
    absorptiveCapacity: {
         type: Number,
         required: true
    },

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

module.exports = mongoose.model('halls',hallsSchema)