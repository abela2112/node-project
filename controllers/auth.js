const User=require('../models/user')
const {StatusCodes}=require('http-status-codes')
const bcrypt=require('bcryptjs')
const {BadRequest, UnauthorizedError}=require('../errors')

const login=async(req,res)=>{
    const {email,password}=req.body
    if(!email||!password){
        throw new BadRequest('please provide a valid email and password')

    }
    const user=await User.findOne({email})
    if(!user){
        throw new UnauthorizedError('invalid credentials')
    }
    const isPasswordCorrect=await user.comparePassword(password)
    console.log(isPasswordCorrect)
    if(!isPasswordCorrect){
        throw new UnauthorizedError('incorrect password')
    }
    const token=user.createJWT()
    res.status(StatusCodes.OK).json({user,token})
}




const register=async (req,res)=>{
    // console.log(req.body)
    // const {name,email,password}=req.body
    // const salt=await bcrypt.genSalt(10)
    // const hashPassword=await bcrypt.hash(password,salt)
    // const tempUser={name,email,password:hashPassword}
    const user=await User.create({...req.body})
    const token=user.createJWT()
    res.json({ user:{user:user.name},token })
}
module.exports={
    login,
    register
}