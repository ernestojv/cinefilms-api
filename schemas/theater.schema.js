const Joi = require('joi');

const number = Joi.number().min(1).max(3);
const name = Joi.string().min(3).max(64);
const rows = Joi.number().min(1).max(100);
const columns = Joi.number().min(1).max(100);

const createTheaterSchema = Joi.object({
    number: number.required(),
    name: name.required(),
    rows: rows.required(),
    columns: columns.required()
});

const updateTheaterSchema = Joi.object({
    id: Joi.string().required(),
    number: number,
    name: name,
    rows: rows,
    columns: columns
});

const getTheaterSchema = Joi.object({
    id: Joi.string().required()
});

module.exports = {
    createTheaterSchema,
    updateTheaterSchema,
    getTheaterSchema
};