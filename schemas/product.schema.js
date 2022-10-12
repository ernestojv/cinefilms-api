const Joi = require('joi');

const name = Joi.string().min(3).max(64);
const description = Joi.string().min(3).max(1024);
const price = Joi.number().min(0).max(1000000);
const image = Joi.string().min(3).max(1024);

const createProductSchema = Joi.object({
    name: name.required(),
    description: description.required(),
    price: price.required(),
    image: image.required()
});

const updateProductSchema = Joi.object({
    name: name,
    description: description,
    price: price,
    image: image
});

const getProductSchema = Joi.object({
    id: Joi.string().required()
});

module.exports = {
    createProductSchema,
    updateProductSchema,
    getProductSchema
};