const dbo = require('../db/conn');

class User {
    static async addUser(user) {
        const db = await dbo.getDb();
        return db.collection('users').insertOne(user);
    }

    static async getUsers() {
        const db = await dbo.getDb();
        return db.collection('users').find().toArray();
    }

    static async getUser(id) {
        const db = await dbo.getDb();
        return db.collection('users').findOne({ _id: id });
    }

    static async getUserByEmail(email) {
        const db = await dbo.getDb();
        return db.collection('users').findOne({ email: email });
    }

    static async updateUser(id, user) {
        const db = await dbo.getDb();
        return db.collection('users').updateOne({ _id: id }, { $set: user });
    }

    static async deleteUser(id) {
        const db = await dbo.getDb();
        return db.collection('users').deleteOne({ _id: id });
    }
}

module.exports = User;