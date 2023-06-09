const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true,
        min: 6,
        max: 50
    } ,
    email: {
        type: String , 
        required: true,
        max:50, 
        min:10,
        unique: true
    } ,
    password: {
        type: String,
        required: true,
        max: 50 , 
        min: 6 ,
    } , 
    token: {
        type:String
    }
})

module.exports = mongoose.model('users',userSchema)