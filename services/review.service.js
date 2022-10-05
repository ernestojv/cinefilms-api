const boom = require('@hapi/boom');
const Review = require('../models/review.model');

class ReviewService {
    async addReview(review) {
        const existingReview = await Review.getReviewByName(review.name);
        if (existingReview) {
            throw boom.conflict('Review already exists');
        }
        return Review.addReview(review);
    }

    async getReviews() {
        return Review.getReviews();
    }

    async getReview(id) {
        const review = await Review.getReview(id);
        if (!review) {
            throw boom.notFound('Review not found');
        }
        return review;
    }

    async getReviewsByMovie(movieId) {
        const review = await Review.getReviewByMovie(movieId);
        if (!review) {
            throw boom.notFound('Review not found');
        }
        return review;
    }

    async getReviewsByUser(userId) {
        const review = await Review.getReviewByUser(userId);
        if (!review) {
            throw boom.notFound('Review not found');
        }
        return review;
    }

    async updateReview(id, review) {
        const oldReview = await Review.getReview(id);
        if (!oldReview) {
            throw boom.notFound('Review not found');
        }
        return Review.updateReview(id, review);
    }

    async deleteReview(id) {
        const review = await Review.getReview(id);
        if (!review) {
            throw boom.notFound('Review not found');
        }
        return Review.deleteReview(id);
    }
}

module.exports = ReviewService;