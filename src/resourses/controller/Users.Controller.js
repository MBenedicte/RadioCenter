import asyncHandler from '../middleware/asyncHandler';
import { CONFLICT, CREATED, SERVER_ERROR, NOT_FOUND, OK } from '.././../constants/statusCodes'
import { createUser, findUser} from '../helpers/queries/userQueries';
import { generateToken } from '../helpers/generateToken';

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

export const checkUserExist = asyncHandler( async (req, res, next)=> { 
    const user =  await findUser(req.body);

    user? next() : res.status(NOT_FOUND).send({
        message: 'User does not exist',
        status: NOT_FOUND
    });
});

export const login = asyncHandler( async (req, res)=>{
    const { first_name, last_name, phone_number } = req.body;
    
    const user = await findUser(req.body);

    const token = generateToken({first_name, last_name, phone_number});
    
    res.status(OK).send({
        message: 'successfully logged in',
        status: OK,
        data: {
            user,
            token
        }
    }) 
});
