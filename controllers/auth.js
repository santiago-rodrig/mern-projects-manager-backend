// const User = require('../models/User')
// const bcryptjs = require('bcryptjs')
const { validationResult } = require('express-validator')
// const jwt = require('jsonwebtoken')
exports.authenticateUser = async (req, res) => {
    // const { email, password } = req.body
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    try {
        // TODO
    } catch (error) {
        // TODO
    }
}
