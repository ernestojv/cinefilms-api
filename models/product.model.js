const dbo = require('../db/connection');

class Product {
    static async addProduct(product) {
        const db = await dbo.getDb();
        return db.collection('products').insertOne(product);
    }

    static async getProducts() {
        const db = await dbo.getDb();
        return db.collection('products').find().toArray();
    }

    static async getProduct(id) {
        const db = await dbo.getDb();
        return db.collection('products').findOne({ _id: id });
    }

    static async getProductByName(name) {
        const db = await dbo.getDb();

        let requestValues = name.split(' ');
        requestValues = requestValues.map(value => {
            return value.charAt(0).toUpperCase() + value.slice(1);
        })

        let products = [];

        for (const value of requestValues) {
            const product = await db.collection('products')
                .find({ 'name': { '$regex': value } })
                .toArray();
            if (product) {
                products = products.concat(product);
            }
        }
        if (requestValues.lenght > 1) {
            const search = products.reduce((acc, product) => {
                acc[product.name] = ++acc[product.name] || 0;
                return acc;
            }, {});

            let data = products.filter((product) => {
                return search[product.name];
            });

            let hash = {};

            data = data.filter(o => {
                let hashoid = hash[o.id];
                return hashoid ? false : true
            });

            return data
        } else {
            return products;
        }
    }

    static async updateProduct(id, product) {
        const db = await dbo.getDb();
        return db.collection('products').updateOne({ _id: id }, { $set: product });
    }

    static async deleteProduct(id) {
        const db = await dbo.getDb();
        return db.collection('products').deleteOne({ _id: id });
    }
}

module.exports = Product;