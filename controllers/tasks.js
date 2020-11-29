const Task = require('../models/Task')
const Project = require('../models/Project')
const { validationResult } = require('express-validator')
exports.createTask = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    try {
        let { project } = req.body
        project = await Project.findById(project)
        if (project.owner.toString() !== req.user) {
            return res
                .status(401)
                .json({ msg: 'You are not the owner of this project' })
        }
        const task = new Task(req.body)
        await task.save()
        res.json({ msg: 'Task successfully created', task })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Something went wrong',
        })
    }
}
