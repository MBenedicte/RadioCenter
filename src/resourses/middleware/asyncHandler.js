import { SERVER_ERROR } from '../../constants/statusCodes';

const asyncHandler = (cb) => async (req, res, next) =>{
    try{
        await cb(req, res, next)
    }
    catch(err){
        let message = err.message;
        const status = err.status || SERVER_ERROR

        return res.status(status).send({
            message, status
        })
    }
}

export default asyncHandler;