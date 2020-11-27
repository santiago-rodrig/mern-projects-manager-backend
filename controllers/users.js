const User = require('../models/User')
const bcryptjs = require('bcryptjs')
const { validationResult } = require('express-validator')
exports.createUser = async (req, res) => {
    const { email, password } = req.body
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    try {
        let user = await User.findOne({ email })
        if (user) {
            return res.status(400).json({ msg: 'Email is already taken' })
        }
        user = new User(req.body)
        const salt = await bcryptjs.genSalt(10)
        user.password = await bcryptjs.hash(password, salt)
        await user.save()
        return res.json({ msg: 'User was successfully created' })
    } catch (error) {
        console.log(error)
        return res.status(400).json({ msg: 'Something went wrong' })
    }
}
