const Project = require('../models/Project')
const { validationResult } = require('express-validator')
exports.createProject = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    try {
        const project = new Project(req.body)
        await project.save()
        res.json(project)
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: 'Something went wrong' })
    }
}
exports.getProjects = async (req, res) => {
    try {
        const projects = await Project.find({ owner: req.body.owner }).sort({
            created_at: -1,
        })
        res.json({ projects })
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: 'Something went wrong' })
    }
}
exports.updateProject = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    try {
        const projectAttributes = { name: req.body.name }
        const project = await Project.findById(req.params.id)
        if (project.owner.toString() !== req.body.owner) {
            return res
                .status(401)
                .json({ msg: 'You are not the owner of this project' })
        }
        await Project.findByIdAndUpdate(req.params.id, projectAttributes)
        res.json({ project })
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: 'Something went wrong' })
    }
}
