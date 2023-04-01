const CustomApiError = require("./custom-api");
const {StatusCodes}=require('http-status-codes')

class BadRequest extends CustomApiError{
    constructor(message){
        super(message)
        this.StatusCode=StatusCodes.BAD_REQUEST
    }
}
module.exports=BadRequest