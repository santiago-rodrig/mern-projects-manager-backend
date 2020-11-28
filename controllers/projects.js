const Project = require('../models/Project')
exports.createProject = async (req, res) => {
    try {
        const { name } = req.body
        const project = new Project({ name })
        await project.save()
        res.json({ msg: "Project was created successfully" })
    } catch (error) {
        console.log(error)
        res.status(400).json({ msg: 'Something went wrong' })
    }
}