const { Boom } = require('@hapi/boom');
const ShowService = require('../../services/show.service');

const fakeShows = [
    {
        _id: '1',
        dateTime: '2020-10-10T10:00:00.000Z',
        theaterId: '1',
        movieId: '1',
        price: 10,
    }
];

jest.mock('../../models/show.model', () => ({
    addShow: jest.fn(() => fakeShows[0]),
    getShows: jest.fn(() => fakeShows),
    getShow: jest.fn((id) => fakeShows.find((show) => show._id === id)),
    getShowsByTheaterId: jest.fn((id) => fakeShows.filter((show) => show.theaterId === id)),
    getShowsByMovieId: jest.fn((id) => fakeShows.filter((show) => show.movieId === id)),
    getShowsByDate: jest.fn((date) => fakeShows.filter((show) => show.dateTime.includes(date))),
    updateShow: jest.fn(() => fakeShows[0]),
    deleteShow: jest.fn(() => fakeShows[0])
}));


describe('ShowService', () => {
    let service;
    beforeEach(() => {
        service = new ShowService();
        jest.clearAllMocks();
    });

    describe('addShow', () => {
        test('should add a show', async () => {
            const show = {
                dateTime: '2020-10-10T10:00:00.000Z',
                theaterId: '1',
                movieId: '1',
                price: 10,
            };
            const result = await service.addShow(show);
            expect(result).toEqual(fakeShows[0]);
        });
    });

    describe('getShow', () => {
        test('should return a show', async () => {
            const result = await service.getShow('1');
            expect(result).toEqual(expect.any(Object));
        });

        test('should throw an error if show does not exist', async () => {
            await expect(service.getShow('2')).rejects.toThrow(Boom);
        });
    });

    describe('getShows', () => {
        test('should return an array of shows', async () => {
            const result = await service.getShows();
            expect(result).toEqual(fakeShows);
        });
    });

    describe('getShowsByTheaterId', () => {
        test('should return an array of shows', async () => {
            const result = await service.getShowsByTheaterId('1');
            expect(result).toEqual(fakeShows);
        });

        test('should return an empty array if no shows exist', async () => {
            const result = await service.getShowsByTheaterId('2');
            expect(result).toEqual([]);
        });
    });

    describe('getShowsByMovieId', () => {
        test('should return an array of shows', async () => {
            const result = await service.getShowsByMovieId('1');
            expect(result).toEqual(fakeShows);
        });

        test('should return an empty array if no shows exist', async () => {
            const result = await service.getShowsByMovieId('2');
            expect(result).toEqual([]);
        });
    });

    describe('getShowsByDate', () => {
        test('should return an array of shows', async () => {
            const result = await service.getShowsByDate('2020-10-10');
            expect(result).toEqual(fakeShows);
        });

        test('should return an empty array if no shows exist', async () => {
            const result = await service.getShowsByDate('2020-10-11');
            expect(result).toEqual([]);
        });
    });

    describe('updateShow', () => {
        test('should update a show', async () => {
            const show = {
                dateTime: '2020-10-10T10:00:00.000Z',
                theaterId: '1',
                movieId: '1',
                price: 10,
            };
            const result = await service.updateShow('1', show);
            expect(result).toEqual(fakeShows[0]);
        });

        test('should throw an error if show does not exist', async () => {
            const show = {
                dateTime: '2020-10-10T10:00:00.000Z',
                theaterId: '1',
                movieId: '1',
                price: 10,
            };
            await expect(service.updateShow('2', show)).rejects.toThrow(Boom);
        });
    });

    describe('deleteShow', () => {
        test('should delete a show', async () => {
            const result = await service.deleteShow('1');
            expect(result).toEqual(fakeShows[0]);
        });

        test('should throw an error if show does not exist', async () => {
            await expect(service.deleteShow('2')).rejects.toThrow(Boom);
        });
    });


});