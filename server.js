require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

app.use(express.json())

// call routes module
const hallsRouter = require('./routes/halls')
const eventsRouter = require('./routes/events')
const usersRouter = require('./routes/users')

app.use('/halls' , hallsRouter)
app.use('/events' , eventsRouter)
app.use('/users' , usersRouter)

app.listen(3000 , () => console.log('server started'))

// I have Node.js using express.js framework with MongoDB  ok ? now I need to check the following 
// if the entered date , start_time and end_time