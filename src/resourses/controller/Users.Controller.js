import asyncHandler from '../middleware/asyncHandler';
import { CONFLICT, CREATED, SERVER_ERROR } from '.././../constants/statusCodes'
import { createUser, findUser} from '../helpers/queries/userQueries';

export const registerUser = asyncHandler(async (req, res) =>{   
    const createdUser = await createUser(req.body);

    if(createdUser){
        res.status(CREATED).send({
            message: "created successfull",
            data: createdUser,
            status: CREATED
        })
    }
    res.status(SERVER_ERROR).send({
        message: 'something went wrong'
    })
});

export const checkUser = asyncHandler( async (req, res, next)=> {
    const {
        phone_number
    } = req.body;

    const user =  await findUser({phone_number});

    user? res.status(CONFLICT).send({
        message: 'User already exists',
        status: CONFLICT
    }): next();
});




