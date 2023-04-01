const mongoose=require('mongoose')
const jobSchema=new mongoose.Schema({
    company:{
        type:String,
        required:[true,'provide company name'],
        maxlength:50
    },
    position:{
        type:String,
        required:[true,'provide position'],
        maxlength:50
    },

    status:{
        type:String,
        required:[true,'provide the status'],
        enum:['interview','decline','pending'],
        default:'pending'
    }
    ,createdBy:{
        type:mongoose.Types.ObjectId,
        ref:'user',
        required:[true,'please provide user ']
    }
},{timestamps:true})

module.exports=mongoose.model('job',jobSchema)