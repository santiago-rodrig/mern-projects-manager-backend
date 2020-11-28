const User = require('../models/User')
const bcryptjs = require('bcryptjs')
const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
exports.authenticateUser = async (req, res) => {
    const { email, password } = req.body
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    try {
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ msg: 'Inexistent user' })
        }
        const validPassword = await bcryptjs.compare(password, user.password)
        if (!validPassword) {
            return res.status(400).json({ msg: 'Wrong password' })
        }
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
        return res.status(400).json({ msg: 'Something went wrong' })
    }
}
