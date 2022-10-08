const dbo = require('../db/connection');

class Show {
    static async addShow(show) {
        const db = await dbo.getDb();
        return db.collection('shows').insertOne(show);
    }

    static async getShows() {
        const db = await dbo.getDb();
        return db.collection('shows').find().toArray();
    }

    static async getShow(id) {
        const db = await dbo.getDb();
        return db.collection('shows').findOne({ _id: id });
    }

    static async getShowsByMovieId(movieId) {
        const db = await dbo.getDb();
        return db.collection('shows').find({ movieId: movieId }).toArray();
    }

    static async getShowsByTheaterId(theaterId) {
        const db = await dbo.getDb();
        return db.collection('shows').find({ theaterId: theaterId }).toArray();
    }

    static async updateShow(id, show) {
        const db = await dbo.getDb();
        return db.collection('shows').updateOne({ _id: id }, { $set: show });
    }

    static async deleteShow(id) {
        const db = await dbo.getDb();
        return db.collection('shows').deleteOne({ _id: id });
    }
}

module.exports = Show;