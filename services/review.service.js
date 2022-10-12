const boom = require('@hapi/boom');
const Review = require('../models/review.model');

class ReviewService {
    async addReview(review) {
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
        return Review.getReviewsByMovie(movieId);
    }

    async getReviewsByUser(userId) {
        return Review.getReviewsByUser(userId);
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