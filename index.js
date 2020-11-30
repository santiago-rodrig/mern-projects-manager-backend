const express = require('express')
const connectToDatabase = require('./db')
const cors = require('cors')

const app = express()
const PORT = process.env.PORT || 4000

// bootstrap database connection
connectToDatabase()

// enable cors
app.use(cors())

// enables requests with json body
app.use(express.json({ extend: true }))

// routers
app.use('/api/users', require('./routes/users'))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/projects', require('./routes/projects'))
app.use('/api/tasks', require('./routes/tasks'))

app.listen(PORT, () => {
    console.log(`The server is running on port ${PORT}`)
})
