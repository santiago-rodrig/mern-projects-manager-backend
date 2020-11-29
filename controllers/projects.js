const Project = require('../models/Project')
const { validationResult } = require('express-validator')
exports.createProject = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    try {
        const project = new Project({
            ...req.body,
            owner: req.user,
        })
        await project.save()
        res.json(project)
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: 'Something went wrong' })
    }
}
exports.getProjects = async (req, res) => {
    try {
        const projects = await Project.find({ owner: req.user }).sort({
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
        let project = await Project.findById(req.params.id)
        if (!project) {
            return res.status(404).json({ msg: 'Project not found' })
        }
        if (project.owner.toString() !== req.user) {
            return res
                .status(401)
                .json({ msg: 'You are not the owner of this project' })
        }
        const projectAttributes = { name: req.body.name }
        project = await Project.findByIdAndUpdate(
            req.params.id,
            projectAttributes
        )
        res.json({ project })
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: 'Something went wrong' })
    }
}
exports.deleteProject = async (req, res) => {
    try {
        let project = await Project.findById(req.params.id)
        if (!project) {
            return res.status(404).json({ msg: 'Project not found' })
        }
        if (project.owner.toString() !== req.user) {
            return res
                .status(401)
                .json({ msg: 'You are not the owner of this project' })
        }
        project = await Project.findByIdAndRemove(req.params.id)
        res.json({ msg: 'Project successfully deleted', project })
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: 'Something went wrong' })
    }
}
