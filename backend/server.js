const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const { errorHandler } = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const PORT = process.env.PORT || 5000
const cors = require('cors')
const path = require('path')

// connect to db
connectDB()

const app = express()

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
   res.status(200).json({ message: 'Welcome to support desk API' })
})

// Routes
app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/tickets', require('./routes/ticketRoutes'))

app.use(errorHandler)

// deployment
__dirname = path.resolve()
if (process.env.NODE_ENV === 'production') {
   app.use(express.static(path.join(__dirname, '/frontend/dist')))
   app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, '/frontend/dist', 'index.html'))
   })
}
app.listen(PORT, () => {
   console.log(`Server started on port ${PORT}`)
})
