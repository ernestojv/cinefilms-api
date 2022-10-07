const { Boom } = require('@hapi/boom');
const ReviewService = require('../../services/review.service');

const fakeReviews = [
    {
        _id: '1',
        movieId: '1',
        userId: '1',
        rating: 5,
        comment: 'This is a comment'
    }
];

jest.mock('../../models/review.model', () => ({
    addReview: jest.fn(() => fakeReviews[0]),
    getReviews: jest.fn(() => fakeReviews),
    getReview: jest.fn((id) => fakeReviews.find((review) => review._id === id)),
    getReviewsByMovie: jest.fn((movieId) => fakeReviews.filter((review) => review.movieId === movieId)),
    getReviewsByUser: jest.fn((userId) => fakeReviews.filter((review) => review.userId === userId)),
    updateReview: jest.fn(() => fakeReviews[0]),
    deleteReview: jest.fn(() => fakeReviews[0])
}));

describe('ReviewService', () => {
    let service;
    beforeEach(() => {
        service = new ReviewService();
        jest.clearAllMocks();
    });

    describe('addReview', () => {
        test('should add a review', async () => {
            const review = {
                movieId: '1',
                userId: '1',
                rating: 5,
                comment: 'This is a comment'
            };
            const result = await service.addReview(review);
            expect(result).toEqual(fakeReviews[0]);
        });
    });

    describe('getReview', () => {
        test('should return a review', async () => {
            const result = await service.getReview('1');
            expect(result).toEqual(expect.any(Object));
        });

        test('should throw an error if review does not exist', async () => {
            await expect(service.getReview('2')).rejects.toThrow(Boom);
        });
    });

    describe('getReviews', () => {
        test('should return an array of reviews', async () => {
            const result = await service.getReviews();
            expect(result).toEqual(fakeReviews);
        });

        test('should return an empty array if there are no reviews', async () => {
            const result = await service.getReviews();
            expect(result).toEqual(expect.any(Array));
        });
    });

    describe('getReviewsByMovie', () => {
        test('should return an array of reviews by movie', async () => {
            const result = await service.getReviewsByMovie('1');
            expect(result).toEqual(expect.any(Array));
        });
        test('should return an empty array if there are no reviews', async () => {
            const result = await service.getReviewsByMovie('2');
            expect(result).toEqual([]);
        });
    });

    describe('getReviewsByUser', () => {
        test('should return an array of reviews by user', async () => {
            const result = await service.getReviewsByUser('1');
            expect(result).toEqual(expect.any(Array));
        });
        test('should return an empty array if there are no reviews', async () => {
            const result = await service.getReviewsByUser('2');
            expect(result).toEqual([]);
        });
    });

    describe('updateReview', () => {
        test('should update a review', async () => {
            const review = {
                movieId: '1',
                userId: '1',
                rating: 5,
                comment: 'This is a comment'
            };
            const result = await service.updateReview('1', review);
            expect(result).toEqual(fakeReviews[0]);
        });

        test('should throw an error if review does not exist', async () => {
            const review = {
                movieId: '1',
                userId: '1',
                rating: 5,
                comment: 'This is a comment'
            };
            await expect(service.updateReview('2', review)).rejects.toThrow(Boom);
        });
    });

    describe('deleteReview', () => {
        test('should delete a review', async () => {
            const result = await service.deleteReview('1');
            expect(result).toEqual(fakeReviews[0]);
        });

        test('should throw an error if review does not exist', async () => {
            await expect(service.deleteReview('2')).rejects.toThrow(Boom);
        });
    });
});