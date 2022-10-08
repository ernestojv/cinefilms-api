const dbo = require('../db/connection');

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

    static async getAdmins() {
        const db = await dbo.getDb();
        return db.collection('users').find({ role: 'admin' }).toArray();
    }

    static async getEmployees() {
        const db = await dbo.getDb();
        return db.collection('users').find({ role: 'employee' }).toArray();
    }

    static async getClients() {
        const db = await dbo.getDb();
        return db.collection('users').find({ role: 'client' }).toArray();
    }

    static async updateUser(email, user) {
        const db = await dbo.getDb();
        return db.collection('users').updateOne({ email: email }, { $set: user });
    }

    static async deleteUser(email) {
        const db = await dbo.getDb();
        return db.collection('users').deleteOne({ email: email });
    }
}

module.exports = User;