import { Joi } from 'celebrate';

export const createUserRule = Joi.object().keys({
    first_name: Joi.string().required().min(3).max(30),
    middle_name: Joi.string().min(3).max(30),
    last_name: Joi.string().required().min(3).max(30),
    phone_number: Joi.string().required().min(10).max(13),
    gender: Joi.string(),
    email: Joi.string().required(),
    password: Joi.string().required()
});

export const loginUserRule = Joi.object().keys({
    first_name: Joi.string().min(3).max(30),
    middle_name: Joi.string().min(3).max(30),
    last_name: Joi.string().min(3).max(30),
    phone_number: Joi.string().required().min(10).max(13),
    password: Joi.string().required()
});
