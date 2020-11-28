const Project = require('../models/Project')
exports.createProject = async (req, res) => {
    try {
        const project = new Project(req.body)
        await project.save()
        res.json(project)
    } catch (error) {
        console.log(error)
        res.status(400).json({ msg: 'Something went wrong' })
    }
}
