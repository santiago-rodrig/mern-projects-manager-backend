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
router.get(
    '/',
    auth,
    [check('project', "Project identifier can't be empty").not().isEmpty()],
    tasksController.getTasks
)
router.put(
    '/:id',
    auth,
    [
        check('name', "Task name can't be blank").not().isEmpty(),
        check('completed', 'Task completed state is required').isBoolean(),
    ],
    tasksController.updateTask
)
module.exports = router
