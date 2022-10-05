const Joi = require('joi');

const name = Joi.string().min(3).max(64);
const realeaseDate = Joi.date();
const duration = Joi.number().min(1).max(500);
const mpaaCategory = Joi.string().min(3).max(64);
const format = Joi.string().min(1).max(4);
const description = Joi.string().min(3).max(1024);
const categoryId = Joi.string();

const createMovieSchema = Joi.object({
    name: name.required(),
    realeaseDate: realeaseDate.required(),
    duration: duration.required(),
    mpaaCategory: mpaaCategory.required(),
    format: format.required(),
    description: description.required(),
    categoryId: categoryId.required()
});

const updateMovieSchema = Joi.object({
    id: Joi.string().required(),
    name: name,
    realeaseDate: realeaseDate,
    duration: duration,
    mpaaCategory: mpaaCategory,
    format: format,
    description: description,
    categoryId: categoryId
});

const getMovieSchema = Joi.object({
    id: Joi.string().required()
});

module.exports = {
    createMovieSchema,
    updateMovieSchema,
    getMovieSchema
};