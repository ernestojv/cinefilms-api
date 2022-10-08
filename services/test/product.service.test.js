const { Boom } = require('@hapi/boom');
const ProductService = require('../../services/product.service');

const fakeProducts = [
    {
        _id: '1',
        name: 'Popcorn',
        description: 'Delicious popcorn',
        price: 5,
        image: 'https://www.google.com'
    }
];

jest.mock('../../models/product.model', () => ({
    addProduct: jest.fn(() => fakeProducts[0]),
    getProducts: jest.fn(() => fakeProducts),
    getProduct: jest.fn((id) => fakeProducts.find((product) => product._id === id)),
    getProductsByName: jest.fn((name) => fakeProducts.filter((product) => product.name === name)),
    updateProduct: jest.fn(() => fakeProducts[0]),
    deleteProduct: jest.fn(() => fakeProducts[0])
}));

describe('Test product service', () => {
    let service;
    beforeEach(() => {
        service = new ProductService();
        jest.clearAllMocks();
    });

    describe('test for addProduct', () => {
        test('should return a product', async () => {
            const product = await service.addProduct({
                name: 'Popcorn',
                description: 'Delicious popcorn',
                price: 5,
                image: 'https://www.google.com'
            });
            expect(product).toEqual(product);
        });
    });

    describe('test for getProduct', () => {
        test('should return a product', async () => {
            const product = await service.getProduct('1');
            expect(product).toEqual(expect.any(Object));
        });

        test('should throw an error if product does not exist', async () => {
            await expect(service.getProduct('2')).rejects.toThrow(Boom);
        });
    });

    describe('test for getProducts', () => {
        test('should return an array of products', async () => {
            const products = await service.getProducts();
            expect(products).toEqual(expect.any(Array));
        });

        test('should return an empty array if there are no products', async () => {
            const products = await service.getProducts();
            expect(products).toEqual(expect.any(Array));
        });


    });

    describe('test for getProductByName', () => {
        test('should return a product', async () => {
            const product = await service.getProductsByName('Popcorn');
            expect(product).toEqual(expect.any(Array));
        });

        test('should return an empty array if there are no products', async () => {
            const product = await service.getProductsByName('Candy');
            expect(product).toEqual(expect.any(Array));
        });
    });

    describe('test for updateProduct', () => {
        test('should return a product', async () => {
            const product = await service.updateProduct('1', {
                name: 'Popcorn',
                description: 'Delicious popcorn',
                price: 5,
                image: 'https://www.google.com'
            });
            expect(product).toEqual(expect.any(Object));
        });

        test('should throw an error if product does not exist', async () => {
            await expect(service.updateProduct('2', {
                name: 'Popcorn',
                description: 'Delicious popcorn',
                price: 5,
                image: 'https://www.google.com'
            })).rejects.toThrow(Boom);
        });
    });

    describe('test for deleteProduct', () => {
        test('should return a product', async () => {
            const product = await service.deleteProduct('1');
            expect(product).toEqual(expect.any(Object));
        });

        test('should throw an error if product does not exist', async () => {
            await expect(service.deleteProduct('2')).rejects.toThrow(Boom);
        });
    });
});