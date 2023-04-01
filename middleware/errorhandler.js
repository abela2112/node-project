const {StatusCodes}=require('http-status-codes')
//const {CustomApiError}=require('../errors')



const errorHandler=(err,req,res,next)=>{
    const customError={
        statusCode:err.StatusCode||StatusCodes.INTERNAL_SERVER_ERROR,
        msg:err.message||'something went wrong'
    }
   
    // if (err instanceof CustomApiError){
    //  return res.status(err.StatusCode).json({msg:err.message,success:false})
    // }
    if(err && err.code===11000){
        customError.msg=`duplicate email ${Object.values((err.keyValue))}`
        customError.statusCode=400
    }
   if(err.name==="ValidationError"){
   
    customError.msg=Object.values(err.errors).map((item)=>item.message).join(',')
    customError.statusCode=400
   }
   if(err.name==="CastError"){
    customError.msg=`no item found with id:${err.value}`
    customError.statusCode=404
   }
    return res.status(customError.statusCode).json({msg:customError.msg,success:false})
}
module.exports=errorHandler