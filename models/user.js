const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const mongoose=require('mongoose')
require('dotenv').config()
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,'provide a valid name'],
        maxlength:20,
        minlength:3
    }, 
    email:{
        type:String,
        required:[true,'provide a valid name'],
        match:[
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please provide a valid email',
          ],
          unique:true
    },
    password:{
        type:String,
        required:[true,'provide a password'],
        
    }
    
})
userSchema.pre('save',async function(){
const salt=await bcrypt.genSalt(10)
this.password=await bcrypt.hash(this.password,salt)
})
userSchema.methods.createJWT=function(){
   return  jwt.sign({userID:this._id,name:this.name},process.env.JWT_SECRET,{expiresIn:'30d'})

}
userSchema.methods.comparePassword=async function(candidatePassword){
    const isMatch=await bcrypt.compare(candidatePassword,this.password)
    return isMatch;
}

module.exports=mongoose.model('user',userSchema)