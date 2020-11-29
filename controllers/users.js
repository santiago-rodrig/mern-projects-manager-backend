const User = require('../models/User')
const bcryptjs = require('bcryptjs')
const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
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
        const payload = { user: user.id }
        jwt.sign(
            payload,
            process.env.SECRET_KEY,
            {
                expiresIn: 3600,
            },
            (error, token) => {
                if (error) throw error
                return res.json({ token })
            }
        )
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: 'Something went wrong' })
    }
}
