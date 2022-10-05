const Joi = require('joi');

const name = Joi.string().min(3).max(64);
const email = Joi.string().email();
const password = Joi.string().min(8).max(64);
const role = Joi.string().min(3).max(64);

const createUserSchema = Joi.object({
    name: name.required(),
    email: email.required(),
    password: password.required(),
    role: role.required()
});

const updateUserSchema = Joi.object({
    id: Joi.string().required(),
    name: name,
    email: email,
    password: password,
    role: role
});

const getUserSchema = Joi.object({
    id: Joi.string().required()
});

module.exports = {
    createUserSchema,
    updateUserSchema,
    getUserSchema
};