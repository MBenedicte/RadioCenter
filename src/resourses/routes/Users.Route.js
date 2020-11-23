import {Router} from 'express';
import { celebrate }from 'celebrate';
import { registerUser, checkUser, login, checkUserExist} from '../controller/Users.Controller';
import { createUserRule, loginUserRule } from '../middleware/validations/users.Validator';

const router = Router();

router.post('/users/register', 
celebrate({
    body: createUserRule
}),
checkUser,
registerUser);

router.post('/users/login', 
celebrate({
    body: loginUserRule
}),
checkUserExist,
login);

export default router;
