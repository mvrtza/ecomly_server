const {expressjwt: expressjwt}  = require('express-jwt')
const {Token} = require('../models/token')

function authJwt(){
    return expressjwt({
        secret:process.env.ACCESS_TOKEN_SECRET
        ,algorithms:['HS256'],
        isRevoked: isRevoked
    }).unless({
        path:[
            `${process.env.API_URL}/login`,
            `${process.env.API_URL}/login/`,
            `${process.env.API_URL}/register`,
            `${process.env.API_URL}/register/`,
            `${process.env.API_URL}/forgot-password`,
            `${process.env.API_URL}/forgot-password/`,
            `${process.env.API_URL}/verify-otp`,
            `${process.env.API_URL}/verify-otp/`,
            `${process.env.API_URL}/reset-password`,
            `${process.env.API_URL}/reset-password/`,
        ]
    })
}
async function isRevoked(req,jwt) {
    const authHeader = req.header('Authorization')
    if(!authHeader.startsWith('Bearer ')){
        return true
    }
    const accessToken = authHeader.replace('Bearer ', '').trim()
    const token = await Token.findOne({accessToken})

    const adminRouteRegex = /^\/api\/v1\/admin\//i
    const adminFault  = !jwt.payload.isAdmin && adminRouteRegex.test(req.originalUrl)

    return adminFault || !token
}

module.exports = authJwt