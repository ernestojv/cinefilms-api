const Joi = require('joi');

const name = Joi.string().min(3).max(64);

const createCategorySchema = Joi.object({
    name: name.required()
});

const updateCategorySchema = Joi.object({
    id: Joi.string().required(),
    name: name
});

const getCategorySchema = Joi.object({
    id: Joi.string().required()
});

module.exports = {
    createCategorySchema,
    updateCategorySchema,
    getCategorySchema
};