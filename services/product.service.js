const boom = require('@hapi/boom');
const Product = require('../models/product.model');

class ProductService {
    async addProduct(product) {
        const existingProduct = await Product.getProductByName(product.name);
        if (existingProduct) {
            throw boom.conflict('Product already exists');
        }
        return Product.addProduct(product);
    }

    async getProducts() {
        return Product.getProducts();
    }

    async getProduct(id) {
        const product = await Product.getProduct(id);
        if (!product) {
            throw boom.notFound('Product not found');
        }
        return product;
    }

    async getProductByName(name) {
        const product = await Product.getProductByName(name);
        if (!product) {
            throw boom.notFound('Product not found');
        }
        return product;
    }

    async updateProduct(id, product) {
        const oldProduct = await Product.getProduct(id);
        if (!oldProduct) {
            throw boom.notFound('Product not found');
        }
        return Product.updateProduct(id, product);
    }

    async deleteProduct(id) {
        const product = await Product.getProduct(id);
        if (!product) {
            throw boom.notFound('Product not found');
        }
        return Product.deleteProduct(id);
    }
}

module.exports = ProductService;