const express = require('express')
const router = express.Router()
const { check } = require('express-validator')
const authController = require('../controllers/auth')
// The root of this route is /api/auth
router.post('/', [
    check('email', 'Email is invalid').isEmail(),
    check('password', 'Password must be at least 6 characters long').isLength({ min: 6 })
], authController.authenticateUser)
module.exports = router
