const { verifyToken } = require("../utils/jwt")

const authMiddleware = async(req, res, next) => {

    try {
        if(!req.headers.authorization){
            res.status(401)
            throw new Error('User doesnt have authorization')
        }

        const token = req.headers.authorization.split(' ').pop()
        const tokenData = await verifyToken(token)

        if(!tokenData._id){
            res.status(401)
            throw new Error('Provided token is invalid')
        }

        next()

    } catch (error) {
        res.json(error)
    }
}

module.exports = authMiddleware