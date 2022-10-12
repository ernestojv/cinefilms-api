const dbo = require('../db/connection');
const { ObjectId } = require('mongodb');

class Purchase {
    static async addPurchase(purchase) {
        const db = await dbo.getDb();
        return db.collection('purchases').insertOne(purchase);
    }

    static async getPurchases() {
        const db = await dbo.getDb();
        return db.collection('purchases').find().toArray();
    }

    static async getPurchase(id) {
        const db = await dbo.getDb();
        id = new ObjectId(id);
        return db.collection('purchases').findOne({ _id: id });
    }

    static async getPurchasesByUserId(id) {
        const db = await dbo.getDb();
        return db.collection('purchases').find({ userId: id }).toArray();
    }

    static async getPurchasesByShowId(id) {
        const db = await dbo.getDb();
        return db.collection('purchases').find({ "showId._id": { $exists : true }}, { "showId._id" : id }).toArray();
    }

    static async getPurchasesByDate(date) {
        const db = await dbo.getDb();
        return db.collection('purchases').find({ date: date }).toArray();
    }

    static async getPurchasesByDateRange(startDate, endDate) {
        const db = await dbo.getDb();
        return db.collection('purchases').find({ date: { $gte: startDate, $lte: endDate } }).toArray();
    }

    static async updatePurchase(id, purchase) {
        const db = await dbo.getDb();
        id = new ObjectId(id);
        return db.collection('purchases').updateOne({ _id: id }, { $set: purchase });
    }

    static async deletePurchase(id) {
        const db = await dbo.getDb();
        id = new ObjectId(id);
        return db.collection('purchases').deleteOne({ _id: id });
    }
}

module.exports = Purchase;