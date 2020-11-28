const express = require('express')
const router = express.Router()
const projectsController = require('../controllers/projects')
const auth = require('../middleware/auth')
// This router has as root /api/projects
router.post('/', auth, projectsController.createProject)
module.exports = router
