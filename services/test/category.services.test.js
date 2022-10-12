const { Boom } = require('@hapi/boom');
const CategoryService = require('../../services/category.service');

const fakeCategories = [
    {
        _id: '1',
        name: 'Romance'
    }
]

jest.mock('../../models/category.model.js', () => ({
    addCategory: jest.fn(() => fakeCategories[0]),
    getCategories: jest.fn(() => fakeCategories),
    getCategory: jest.fn((id) => fakeCategories.find((category) => category._id === id)),
    getCategoryByName: jest.fn((name) => fakeCategories.find((category) => category.name === name)),
    updateCategory: jest.fn(() => fakeCategories[0]),
    deleteCategory: jest.fn(() => fakeCategories[0])
}));

describe('Test category service', () => {
    let service;
    beforeEach(() => {
        service = new CategoryService();
        jest.clearAllMocks();
    });

    describe('test for addCategory', () => {
        test('should return a category', async () => {
            const category = await service.addCategory({ name: 'Drama' });
            expect(category).toEqual(expect.any(Object));
        });
    });

    describe('test for getCategory', () => {
        test('should return a category', async () => {
            const category = await service.getCategory('1');
            expect(category).toEqual(expect.any(Object));
        });

        test('should throw an error if category does not exist', async () => {
            await expect(service.getCategory('2')).rejects.toThrow(Boom);
        });
    });

    describe('test for getCategories', () => {
        test('should return an array of categories', async () => {
            const categories = await service.getCategories();
            expect(categories).toEqual(expect.any(Array));
        });
    });

    describe('test for getCategoryByName', () => {
        test('should return a category', async () => {
            const category = await service.getCategoryByName('Romance');
            expect(category).toEqual(expect.any(Object));
        });

        test('should throw an error if category does not exist', async () => {
            await expect(service.getCategoryByName('Drama')).rejects.toThrow(Boom);
        });
    });

    describe('test for updateCategory', () => {
        test('should return a category', async () => {
            const category = await service.updateCategory('1', { name: 'Drama' });
            expect(category).toEqual(expect.any(Object));
        });

        test('should throw an error if category does not exist', async () => {
            await expect(service.updateCategory('2', { name: 'Drama' })).rejects.toThrow(Boom);
        });
    });

    describe('test for deleteCategory', () => {
        test('should return a category', async () => {
            const category = await service.deleteCategory('1');
            expect(category).toEqual(expect.any(Object));
        });

        test('should throw an error if category does not exist', async () => {
            await expect(service.deleteCategory('2')).rejects.toThrow(Boom);
        });
    });

});