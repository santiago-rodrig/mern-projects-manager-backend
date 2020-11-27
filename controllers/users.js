const User = require('../models/User')

exports.createUser = async (req, res) => {
    const { email } = req.body

    try {
        let user = await User.findOne({ email })

        if (user) {
            return res.status(400).json({ msg: 'Email is already taken' })
        }

        user = new User(req.body)

        await user.save()

        return res.json({ msg: 'User was successfully created' })
    } catch (error) {
        console.log(error)

        return res.status(400).json({ msg: 'Something went wrong' })
    }
}
