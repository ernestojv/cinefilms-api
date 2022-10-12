const Joi = require('joi');

const dateTime = Joi.date();
const theaterId = Joi.string();
const movieId = Joi.string();
const price = Joi.number().min(1).max(1000);

const createShowSchema = Joi.object({
    dateTime: dateTime.required(),
    theaterId: theaterId.required(),
    movieId: movieId.required(),
    price: price.required()
});

const updateShowSchema = Joi.object({
    dateTime: dateTime,
    theaterId: theaterId,
    movieId: movieId,
    price: price,
    seats: Joi.array().items(Joi.string())
});

const getShowSchema = Joi.object({
    id: Joi.string().required()
});

module.exports = {
    createShowSchema,
    updateShowSchema,
    getShowSchema
};