const { User } = require("../models/user")

exports.getUsers = async function (_,res) {
    try {
        const users = await User.find().select('name email id isAdmin')
        if(!users){
            return res.status(404).json({message:'Users not found'})
        }else{
            return res.json(users)
        }
    } catch (error) {
        console.error(error)
        return res.status(500).json({type:error.name,message:error.message})
    }
}
exports.getUserById = async function (req,res) {
    try {
        const user = await User.findById(req.params.id).select('-passwordHash -resetPasswordOtp -resetPasswordOtpExpires')
        if(!user){
            return res.status(404).json({message:'User not found'})
        }
        return res.json(user)
    } catch (error) {
        console.error(error)
        return res.status(500).json({type:error.name,message:error.message})
    }
}
exports.updateUser = async function (req,res) {
    try {
        const {name,email,phone} = req.body
        const user = User.findByIdAndUpdate(
            req.params.id,
            {name,email,phone},{new:true}
        )
        if(!user){
            return res.status(404).json({message:'User not found'})
        }
        user.passwordHash = undefined
        return res.json(user)
    } catch (error) {
        console.error(error)
        return res.status(500).json({type:error.name,message:error.message})
    }
}