const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const tasksController = require('../controllers/tasks')
const { check } = require('express-validator')
// path -> /api/tasks
router.post(
    '/',
    auth,
    [
        check('name', "Task name can't be empty").not().isEmpty(),
        check('project', "Project identifier can't be empty").not().isEmpty(),
    ],
    tasksController.createTask
)
module.exports = router
