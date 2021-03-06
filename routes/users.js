const express = require('express')
const usersController = require('../controllers/users')
const router = express.Router()
const { check } = require('express-validator')

// router root -> /api/users
router.post(
    '/',
    [
        check('name', 'The name is required').not().isEmpty(),
        check('email', 'Email is invalid').isEmail(),
        check(
            'password',
            'Password must be at least 6 characters long'
        ).isLength({ min: 6 }),
    ],
    usersController.createUser
)

module.exports = router
