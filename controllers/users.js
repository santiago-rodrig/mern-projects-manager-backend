const User = require('../models/User')

exports.createUser = async (req, res) => {
    try {
        const user = new User(req.body)
        await user.save()
        res.send("User was successfully created")
    } catch (error) {
        console.log(error)
        res.status(400).send("Something went wrong")
    }
}
