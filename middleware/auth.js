const jwt = require('jsonwebtoken')
module.exports = (req, res, next) => {
    const token = req.header('x-auth-token')
    if (!token) return res.status(401).json({ msg: 'No token provided' })
    try {
        const payload = jwt.verify(token, process.env.SECRET_KEY)
        req.user = payload.user
        next()
    } catch (error) {
        console.log(error)
        res.status(401).json({ msg: 'Invalid token' })
    }
}
