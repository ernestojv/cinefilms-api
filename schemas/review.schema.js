const Joi = require('joi');

const movieId = Joi.string();
const userId = Joi.string();
const rating = Joi.number().min(1).max(5);
const comment = Joi.string().min(3).max(1024);

const createReviewSchema = Joi.object({
    movieId: movieId.required(),
    userId: userId.required(),
    rating: rating.required(),
    comment: comment.required()
});

const updateReviewSchema = Joi.object({
    id: Joi.string().required(),
    movieId: movieId,
    userId: userId,
    rating: rating,
    comment: comment
}); 

const getReviewSchema = Joi.object({
    id: Joi.string().required()
});

module.exports = {
    createReviewSchema,
    updateReviewSchema,
    getReviewSchema
};