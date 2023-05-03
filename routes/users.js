const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// get all users
router.get('/' , async (req , res) => {
    try {
        const users = await User.find()
        return res.json(users)
    } catch(err){
        res.status(500).json({message: err.message})
    }
})


// add new user
router.post('/register' , async (req , res) => {

  // hash password
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password , salt);
    const user = new User({
       name: req.body.name , 
       email: req.body.email, 
       password: hashPassword
    })
    try{
        const newUser = await  user.save();
        const token = jwt.sign({_id: newUser._id} , process.env.TOKEN_SECRET)
        newUser.token = token
        return res.header('auth-token' , token).status(201).json({user: newUser})
       // res.status(201).json([newUser])
    }catch(err) {
        res.status(400).json({ message: err.message })
    }
})


router.post('/login' , async (req , res) => {

  let email = req.body.email 
  let password = req.body.password
  // check email if exist
  const user = await User.findOne({email: email})
  if(!user) return res.status(401).send('The emial not exist')
  // check password if it correct
  const validPass = await bcrypt.compare(password , user.password)
  if(!validPass) return res.status(401).send('Invalid password')
  const token = jwt.sign({_id: user._id} , process.env.TOKEN_SECRET)
  user.token = token
   res.header('auth-token' , token).status(200).send({user})
})

// delete specific user
router.delete('/delete/:id', async (req, res) => {
    try {
      const user = await User.findByIdAndDelete(req.params.id)
      if(!user){
        return res.status(404).json({message: "cannot find this hall" })
      }
      return res.status(200).json({ message: 'Deleted hall' })
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  })


module.exports = router