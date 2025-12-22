const jwt = require('jsonwebtoken')
var token = ''
const {registerSchema} = require('../validation/validation.js')
async function verify(req, res, next) {
    try {
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1]
        } else {
            return res.status(500).send('Bạn chưa có token')
        }
        jwt.verify(token, '12345', (err, decoded) => {
            if (err) {
                return res.status(500).send({message: false,text: 'Token ko hợp lệ'})
            } else {
                req.user = decoded
                next()
            }
        })
    } catch (err) {
        return res.status(500).send('verify'+err)
    }
}
async function validation(req, res, next) {
    try {
        const {email,name}  = req.body
        const { error } = registerSchema.validate({email,name})
        if(error){
            return res.status(400).json({
                message: 'Invalid Input',
                deatil: error.details
            })
        }
        next()
    }catch(err){
        res.status(500).send('Lỗi tại verifyValidation'+err)
    }
}

module.exports = {verify,validation}