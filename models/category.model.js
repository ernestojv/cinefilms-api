const dbo = require('../db/conn');

class Category {
    static async addCategory(category) {
        const db = await dbo.getDb();
        return db.collection('categories').insertOne(category);
    }

    static async getCategories() {
        const db = await dbo.getDb();
        return db.collection('categories').find().toArray();
    }

    static async getCategory(id) {
        const db = await dbo.getDb();
        return db.collection('categories').findOne({ _id: id });
    }

    static async getCategoryByName(name) {
        const db = await dbo.getDb();
        return db.collection('categories').findOne({ name: name });
    }

    static async updateCategory(id, category) {
        const db = await dbo.getDb();
        return db.collection('categories').updateOne({ _id: id }, { $set: category });
    }

    static async deleteCategory(id) {
        const db = await dbo.getDb();
        return db.collection('categories').deleteOne({ _id: id });
    }
}

module.exports = Category;