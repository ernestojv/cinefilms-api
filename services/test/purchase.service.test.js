const { Boom } = require('@hapi/boom');
const PurchaseService = require('../../services/purchase.service');

const fakePurchases = [
    {
        _id: '1',
        dateTime: '2020-10-10T10:00:00.000Z',
        showId: '1',
        userId: '1',
        seats: ['A1', 'A2'],
        productsId: ['1', '2']
    }
];

jest.mock('../../models/purchase.model', () => ({
    addPurchase: jest.fn(() => fakePurchases[0]),
    getPurchases: jest.fn(() => fakePurchases),
    getPurchase: jest.fn((id) => fakePurchases.find((purchase) => purchase._id === id)),
    getPurchasesByUserId: jest.fn((id) => fakePurchases.filter((purchase) => purchase.userId === id)),
    getPurchasesByShowId: jest.fn((id) => fakePurchases.filter((purchase) => purchase.showId === id)),
    updatePurchase: jest.fn(() => fakePurchases[0]),
    deletePurchase: jest.fn(() => fakePurchases[0])
}));

describe('Test purchase service', () => {
    let service;
    beforeEach(() => {
        service = new PurchaseService();
        jest.clearAllMocks();
    });

    describe('Test addPurchase', () => {
        test('should return a purchase', async () => {
            const purchase = {
                dateTime: '2020-10-10T10:00:00.000Z',
                showId: '1',
                userId: '1',
                seats: ['A1', 'A2'],
                productsId: ['1', '2']
            };
            const result = await service.addPurchase(purchase);
            expect(result).toEqual(fakePurchases[0]);
        });
    });

    describe('Test getPurchase', () => {
        test('should return a purchase', async () => {
            const result = await service.getPurchase('1');
            expect(result).toEqual(fakePurchases[0]);
        });

        test('should throw an error if purchase does not exist', async () => {
            await expect(service.getPurchase('2')).rejects.toThrow(Boom);
        });
    });

    describe('Test getPurchases', () => {
        test('should return an array of purchases', async () => {
            const result = await service.getPurchases();
            expect(result).toEqual(fakePurchases);
        });

        test('should return an empty array if there are no purchases', async () => {
            const result = await service.getPurchases();
            expect(result).toEqual(expect.any(Array));
        });
    });

    describe('Test getPurchasesByUserId', () => {
        test('should return an array of purchases', async () => {
            const result = await service.getPurchasesByUserId('1');
            expect(result).toEqual(expect.any(Array));
        });

        test('should return an empty array if there are no purchases', async () => {
            const result = await service.getPurchasesByUserId('2');
            expect(result).toEqual([]);
        });
    });

    describe('Test getPurchasesByShowId', () => {
        test('should return an array of purchases', async () => {
            const result = await service.getPurchasesByShowId('1');
            expect(result).toEqual(expect.any(Array));
        });

        test('should return an empty array if there are no purchases', async () => {
            const result = await service.getPurchasesByShowId('2');
            expect(result).toEqual([]);
        });
    });

    describe('Test updatePurchase', () => {
        test('should return a purchase', async () => {
            const purchase = {
                dateTime: '2020-10-10T10:00:00.000Z',
                showId: '1',
                userId: '1',
                seats: ['A1', 'A2'],
                productsId: ['1', '2']
            };
            const result = await service.updatePurchase('1', purchase);
            expect(result).toEqual(fakePurchases[0]);
        });

        test('should throw an error if purchase does not exist', async () => {
            const purchase = {
                dateTime: '2020-10-10T10:00:00.000Z',
                showId: '1',
                userId: '1',
                seats: ['A1', 'A2'],
                productsId: ['1', '2']
            };
            await expect(service.updatePurchase('2', purchase)).rejects.toThrow(Boom);
        });
    });

    describe('Test deletePurchase', () => {
        test('should return a purchase', async () => {
            const result = await service.deletePurchase('1');
            expect(result).toEqual(fakePurchases[0]);
        });

        test('should throw an error if purchase does not exist', async () => {
            await expect(service.deletePurchase('2')).rejects.toThrow(Boom);
        });
    });
});