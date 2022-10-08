const Joi = require('joi');

const date = Joi.date();
const showId = Joi.string();
const userId = Joi.string();
const seats = Joi.array().items(Joi.string());
const productsId = Joi.array().items(Joi.string());

const createPurchaseSchema = Joi.object({
    date: date.required(),
    showId: showId.required(),
    userId: userId.required(),
    seats: seats.required(),
    productsId: productsId.required()
});

const updatePurchaseSchema = Joi.object({
    date: date,
    showId: showId,
    userId: userId,
    seats: seats,
    productsId: productsId
});

const getPurchaseSchema = Joi.object({
    id: Joi.string().required()
});

module.exports = {
    createPurchaseSchema,
    updatePurchaseSchema,
    getPurchaseSchema
};

