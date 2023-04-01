const BadRequest=require('./Bad-request')
const UnauthorizedError=require('./unauthorized')
const CustomApiError=require('./custom-api')
const  NotFoundError=require('./notfoundErrors')
module.exports={
    BadRequest,
    UnauthorizedError,
    CustomApiError,
    NotFoundError
}