const dbo = require('../db/connection');

class Review {
    static async addReview(review) {
        const db = await dbo.getDb();
        return db.collection('reviews').insertOne(review);
    }

    static async getReviews() {
        const db = await dbo.getDb();
        return db.collection('reviews').find().toArray();
    }

    static async getReview(id) {
        const db = await dbo.getDb();
        return db.collection('reviews').findOne({ _id: id });
    }

    static async getReviewsByMovie(movieId) {
        const db = await dbo.getDb();
        return db.collection('reviews').find({ movieId: movieId }).toArray();
    }

    static async getReviewsByUser(userId) {
        const db = await dbo.getDb();
        return db.collection('reviews').find({ userId: userId }).toArray();
    }

    static async updateReview(id, review) {
        const db = await dbo.getDb();
        return db.collection('reviews').updateOne({ _id: id }, { $set: review });
    }

    static async deleteReview(id) {
        const db = await dbo.getDb();
        return db.collection('reviews').deleteOne({ _id: id });
    }
}

module.exports = Review;