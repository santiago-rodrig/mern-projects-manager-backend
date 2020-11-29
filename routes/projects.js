const express = require('express')
const router = express.Router()
const projectsController = require('../controllers/projects')
const auth = require('../middleware/auth')
const { check } = require('express-validator')
// This router has as root /api/projects
router.post(
    '/',
    auth,
    [check('name', 'The project must have a nonempty name').not().isEmpty()],
    projectsController.createProject
)
router.get('/', auth, projectsController.getProjects)
router.put(
    '/:id',
    auth,
    [check('name', 'The project must have a nonempty name').not().isEmpty()],
    projectsController.updateProject
)
module.exports = router
