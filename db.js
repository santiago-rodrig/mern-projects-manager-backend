const mongoose = require('mongoose')
require('dotenv').config({ path: 'variables.env' })

const connectToDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        })

        console.log('Successfully connected to the database')
    } catch (e) {
        console.log(e)
    }
}

module.exports = connectToDatabase
