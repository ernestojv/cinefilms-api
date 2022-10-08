const dbo = require('../db/connection');

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
        return db.collection('purchases').findOne({ _id: id });
    }

    static async getPurchasesByUserId(id) {
        const db = await dbo.getDb();
        return db.collection('purchases').find({ userId: id }).toArray();
    }

    static async getPurchasesByShowId(id) {
        const db = await dbo.getDb();
        return db.collection('purchases').find({ showId: id }).toArray();
    }

    static async updatePurchase(id, purchase) {
        const db = await dbo.getDb();
        return db.collection('purchases').updateOne({ _id: id }, { $set: purchase });
    }

    static async deletePurchase(id) {
        const db = await dbo.getDb();
        return db.collection('purchases').deleteOne({ _id: id });
    }
}

module.exports = Purchase;