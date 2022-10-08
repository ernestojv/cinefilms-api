const dbo = require('../db/connection');

class Theater {
    static async addTheater(theater) {
        const db = await dbo.getDb();
        return db.collection('theaters').insertOne(theater);
    }

    static async getTheaters() {
        const db = await dbo.getDb();
        return db.collection('theaters').find().toArray();
    }

    static async getTheater(id) {
        const db = await dbo.getDb();
        return db.collection('theaters').findOne({ _id: id });
    }

    static async updateTheater(id, theater) {
        const db = await dbo.getDb();
        return db.collection('theaters').updateOne({ _id: id }, { $set: theater });
    }

    static async deleteTheater(id) {
        const db = await dbo.getDb();
        return db.collection('theaters').deleteOne({ _id: id });
    }
}

module.exports = Theater;