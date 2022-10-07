const boom = require('@hapi/boom');
const Purchase = require('../models/purchase.model');

class PurchaseService {
    async addPurchase(purchase) {
        return Purchase.addPurchase(purchase);
    }

    async getPurchases() {
        return Purchase.getPurchases();
    }

    async getPurchase(id) {
        const purchase = await Purchase.getPurchase(id);
        if (!purchase) {
            throw boom.notFound('Purchase not found');
        }
        return purchase;
    }

    async getPurchasesByUserId(id) {
        return Purchase.getPurchasesByUserId(id);
    }

    async getPurchasesByShowId(id) {
        return Purchase.getPurchasesByShowId(id);
    }

    async updatePurchase(id, purchase) {
        const oldPurchase = await Purchase.getPurchase(id);
        if (!oldPurchase) {
            throw boom.notFound('Purchase not found');
        }
        return Purchase.updatePurchase(id, purchase);
    }

    async deletePurchase(id) {
        const purchase = await Purchase.getPurchase(id);
        if (!purchase) {
            throw boom.notFound('Purchase not found');
        }
        return Purchase.deletePurchase(id);
    }
}

module.exports = PurchaseService;