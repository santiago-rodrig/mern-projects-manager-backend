const express = require('express')
const connectToDatabase = require('./db')
const app = express()
const PORT = process.env.PORT || 4000
connectToDatabase()
// enables requests with json body
app.use(express.json({ extend: true }))
app.use('/api/users', require('./routes/users'))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/projects', require('./routes/projects'))
app.listen(PORT, () => {
    console.log(`The server is running on port ${PORT}`)
})
