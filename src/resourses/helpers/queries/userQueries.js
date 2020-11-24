import db from '../../../database/models';
import {Op} from 'sequelize';

const createUser = async (data)=> {

    const user = await db.User.create(data);
    return user;
} 

const findUser = async (condition)  =>{
  const checkUser = await db.User.findOne({ where: condition });
    return checkUser;
}

export { createUser, findUser};
