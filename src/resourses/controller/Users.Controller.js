import asyncHandler from '../middleware/asyncHandler';
import { CONFLICT, CREATED, SERVER_ERROR, NOT_FOUND, OK } from '.././../constants/statusCodes'
import { createUser, findUser} from '../helpers/queries/userQueries';
import { generateToken } from '../helpers/generateToken';
import { hashpassword, comparePassord } from '../helpers/hashPassword';

export const registerUser = asyncHandler(async (req, res) =>{
    const { first_name, middle_name, last_name, phone_number,email, gender, password} = req.body;

    const hashedPassword = hashpassword(password);

    const createdUser = await createUser({
        first_name,
        middle_name,
        last_name,
        phone_number,
        gender,
        email,
        password: hashedPassword
    });

    const user = Object.keys(createdUser.dataValues).reduce((obj, key) => {
        key !== 'password' ? obj[key] = createdUser.dataValues[key] : null;
        return obj;
      }, {});

    if(createdUser){
        res.status(CREATED).send({
            data: {
                user,
                message: 'created successfull',
                status: CREATED
            },
            
        })
    }
    res.status(SERVER_ERROR).send({
        errors: {
            message: 'something went wrong'
        }
    })
});

export const checkUser = asyncHandler( async (req, res, next)=> {
    const {
        phone_number
    } = req.body;

    const user =  await findUser({phone_number});

    user? res.status(CONFLICT).send({
        errors: {
            message: 'User already exists',
            status: CONFLICT
        }
    }): next();
});

export const checkUserExist = asyncHandler( async (req, res, next)=> { 
    const {
        phone_number, first_name, last_name
    } = req.body;

    const user =  await findUser({ phone_number, first_name, last_name});

    user? next() : res.status(NOT_FOUND).send({
        errors:{
            message: 'User does not exist',
            status: NOT_FOUND
        }
    });
});

export const login = asyncHandler( async (req, res)=>{
    const { phone_number, first_name, last_name } = req.body;
    
    const foundUser = await findUser({phone_number});

    const checkUserPassword = comparePassord(req.body.password, foundUser.password);

    if (checkUserPassword)
    {
        const token = generateToken({first_name, last_name, phone_number});
    
        const user = Object.keys(foundUser.dataValues).reduce((obj, key) => {
            key !== 'password' ? obj[key] = foundUser.dataValues[key] : null;
            return obj;
          }, {});

        res.status(OK).send({
            data: {
                user,
                token,
                message: 'successfully logged in',
                status: OK,
            }
        })
    }
    res.status(NOT_FOUND).send({
        errors: {
            message: 'User or password is not found',
            status: NOT_FOUND
        }
    })   
});
