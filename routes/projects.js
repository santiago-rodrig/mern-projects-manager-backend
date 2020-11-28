const express = require('express')
const router = express.Router()
const projectsController = require('../controllers/projects')
// This router has as root /api/projects
router.post('/', projectsController.createProject)
module.exports.default = router