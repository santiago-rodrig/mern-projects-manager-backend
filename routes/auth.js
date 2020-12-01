const express = require('express')
const router = express.Router()
const { check } = require('express-validator')
const authController = require('../controllers/auth')
const auth = require('../middleware/auth')

// router root -> /api/auth
router.post(
    '/',
    [
        check('email', 'Email is invalid').isEmail(),
        check(
            'password',
            'Password must be at least 6 characters long'
        ).isLength({ min: 6 }),
    ],
    authController.authenticateUser
)

router.get('/', auth, authController.loggedInUser)

module.exports = router
