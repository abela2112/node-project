const jwt=require('jsonwebtoken')
const user=require('../models/user')
const {UnauthorizedError}=require('../errors')
require('dotenv').config()


const authorize=async (req,res,next)=>{
    console.log(req.headers.authorization)
    const authHeader=req.headers.authorization
    if(!authHeader||!authHeader.startsWith('Bearer')){
        throw new UnauthorizedError('Authentication is invalid ')
    }
try{
    console.log(authHeader)
    const token=authHeader.split(' ')[1]
    const payload=jwt.verify(token,process.env.JWT_SECRET)

    req.user={
        name:payload.name,userID:payload.userID
    }
    next()
}
catch(err){
    throw new UnauthorizedError('Authentication is invalid ')
}

}
module.exports=authorize