import {Router} from 'express';
import { celebrate }from 'celebrate';
import { registerUser, checkUser} from '../controller/Users.Controller';
import { createUserRule } from '../middleware/validations/users.Validator';

const router = Router();

router.post('/users/register', 
celebrate({
    body: createUserRule
}),
checkUser,
registerUser);


export default router;
