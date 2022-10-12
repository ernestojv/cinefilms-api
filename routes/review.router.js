const express = require('express');
const ReviewService = require('../services/review.service');
const validatorHandler = require('../middlewares/validator.handler');
const { checkRoles } = require('../middlewares/auth.handler');
const { createReviewSchema, updateReviewSchema, getReviewSchema } = require('../schemas/review.schema');
const passport = require('passport');
const router = express.Router();
const service = new ReviewService();

router.get('/',
    async (req, res, next) => {
        try {
            const reviews = await service.getReviews();
            res.status(200).json({
                data: reviews,
                message: 'reviews listed'
            });
        } catch (err) {
            next(err);
        }
    }
);

router.get('/:id',
    validatorHandler(getReviewSchema, 'params'),
    async (req, res, next) => {
        const { id } = req.params;
        try {
            const review = await service.getReview(id);
            res.status(200).json({
                data: review,
                message: 'review retrieved'
            });
        } catch (err) {
            next(err);
        }
    }
);

router.get('/movie/:id',
    validatorHandler(getReviewSchema, 'params'),
    async (req, res, next) => {
        const { id } = req.params;
        try {
            const reviews = await service.getReviewsByMovie(id);
            res.status(200).json({
                data: reviews,
                message: 'reviews retrieved'
            });
        } catch (err) {
            next(err);
        }
    }
);

router.get('/user/:id',
    passport.authenticate('jwt', { session: false }),
    checkRoles(['admin', 'user']),
    validatorHandler(getReviewSchema, 'params'),
    async (req, res, next) => {
        const { id } = req.params;
        try {
            const reviews = await service.getReviewsByUser(id);
            res.status(200).json({
                data: reviews,
                message: 'reviews retrieved'
            });
        } catch (err) {
            next(err);
        }
    }
);

router.post('/',
    passport.authenticate('jwt', { session: false }),
    checkRoles(['user']),
    validatorHandler(createReviewSchema, 'body'),
    async (req, res, next) => {
        const { body: review } = req;
        try {
            const createdReview = await service.addReview(review);
            res.status(201).json({
                data: createdReview,
                message: 'review created'
            });
        } catch (err) {
            next(err);
        }
    }
);

router.put('/:id',
    passport.authenticate('jwt', { session: false }),
    checkRoles(['user']),
    validatorHandler(getReviewSchema, 'params'),
    validatorHandler(updateReviewSchema, 'body'),
    async (req, res, next) => {
        const { id } = req.params;
        const { body: review } = req;
        try {
            const updatedReview = await service.updateReview(id, review);
            res.status(200).json({
                data: updatedReview,
                message: 'review updated'
            });
        } catch (err) {
            next(err);
        }
    }
);

router.delete('/:id',
    passport.authenticate('jwt', { session: false }),
    checkRoles(['admin', 'user']),
    validatorHandler(getReviewSchema, 'params'),
    async (req, res, next) => {
        const { id } = req.params;
        try {
            const deletedReview = await service.deleteReview(id);
            res.status(200).json({
                data: deletedReview,
                message: 'review deleted'
            });
        } catch (err) {
            next(err);
        }
    }
);

module.exports = router;