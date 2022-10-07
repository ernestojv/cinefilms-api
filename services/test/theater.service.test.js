const { Boom } = require('@hapi/boom');
const TheaterService = require('../../services/theater.service');

const fakeTheaters = [
    {
        _id: '1',
        number: 1,
        name: 'Theater 1',
        rows: 10,
        columns: 10,
    }
];

jest.mock('../../models/theater.model', () => ({
    addTheater: jest.fn(() => fakeTheaters[0]),
    getTheaters: jest.fn(() => fakeTheaters),
    getTheater: jest.fn((id) => fakeTheaters.find((theater) => theater._id === id)),
    updateTheater: jest.fn(() => fakeTheaters[0]),
    deleteTheater: jest.fn(() => fakeTheaters[0])
}));

describe('TheaterService', () => {
    let service;
    beforeEach(() => {
        service = new TheaterService();
        jest.clearAllMocks();
    });

    describe('addTheater', () => {
        test('should add a theater', async () => {
            const theater = {
                number: 1,
                name: 'Theater 1',
                rows: 10,
                columns: 10,
            };
            const result = await service.addTheater(theater);
            expect(result).toEqual(fakeTheaters[0]);
        });
    });

    describe('getTheater', () => {
        test('should return a theater', async () => {
            const result = await service.getTheater('1');
            expect(result).toEqual(expect.any(Object));
        });

        test('should throw an error if theater does not exist', async () => {
            await expect(service.getTheater('2')).rejects.toThrow(Boom);
        });
    });

    describe('getTheaters', () => {
        test('should return an array of theaters', async () => {
            const result = await service.getTheaters();
            expect(result).toEqual(fakeTheaters);
        });
    });

    describe('updateTheater', () => {
        test('should update a theater', async () => {
            const theater = {
                number: 1,
                name: 'Theater 1',
                rows: 10,
                columns: 10,
            };
            const result = await service.updateTheater('1', theater);
            expect(result).toEqual(fakeTheaters[0]);
        });
        test('should throw an error if theater does not exist', async () => {
            const theater = {
                number: 1,
                name: 'Theater 1',
                rows: 10,
                columns: 10,
            };
            await expect(service.updateTheater('2', theater)).rejects.toThrow(Boom);
        });
    });

    describe('deleteTheater', () => {
        test('should delete a theater', async () => {
            const result = await service.deleteTheater('1');
            expect(result).toEqual(fakeTheaters[0]);
        });
        test('should throw an error if theater does not exist', async () => {
            await expect(service.deleteTheater('2')).rejects.toThrow(Boom);
        });
    });
});