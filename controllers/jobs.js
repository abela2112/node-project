const Job=require('../models/jobs')
const {StatusCodes}=require('http-status-codes')
const {BadRequest, NotFoundError}=require('../errors')

const getAllJobs=async(req,res)=>{
    const jobs=await Job.find({createdBy:req.user.userID})
    res.status(StatusCodes.OK).json({jobs,count:jobs.length})
}
const getSIngleJobs=async(req,res)=>{
   const {user:{userID},params:{id:jobID}}=req
   const job=await Job.findOne({_id:jobID,createdBy:userID})
   if(!job){
    throw new  NotFoundError(`there is no any job with ${jobID} id`)
   }
   res.status(StatusCodes.OK).json({job})
}
const createJobs=async(req,res)=>{
    req.body.createdBy=req.user.userID
    const job=await Job.create(req.body)
    res.json(job)
}
const updateJobs=async(req,res)=>{
    const {body:{company,position},
    user:{userID},
    params:{id:jobID}
    }=req
    if(!company||!position){
        throw new BadRequest(`please provide  a company name`)
    }
    const job=await Job.findByIdAndUpdate({_id:jobID,createdBy:userID},req.body,{new:true,runValidators:true});
    if(!job){
        throw new NotFoundError(`there is no any job with ${jobID} id`)
    }
    res.status(StatusCodes.OK).json(job)
}

const deleteJobs=async(req,res)=>{
    const {
        user:{userID},
        params:{id:jobID}
    }=req
    const job=await Job.findByIdAndDelete({_id:jobID,createdBy:userID})
    if(!job){
        throw new NotFoundError(`there is no job with this ${jobID} id`)
    }
    res.status(StatusCodes.OK).json(job)
}
module.exports={
    getAllJobs,
    getSIngleJobs,
    createJobs,
    updateJobs,
    deleteJobs
}