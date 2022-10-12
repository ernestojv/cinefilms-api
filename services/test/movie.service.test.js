const { Boom } = require('@hapi/boom');
const MovieService = require('../../services/movie.service');

const fakeMovies = [
    {
        _id: '1',
        name: 'The Shawshank Redemption',
        realeaseDate: '1994-09-23',
        duration: 142,
        mpaaCategory: 'R',
        format: '3D',
        description: 'Two imprisoned',
        categoryId: '1'
    }
]

jest.mock('../../models/movie.model.js', () => ({
    addMovie: jest.fn(() => fakeMovies[0]),
    getMovies: jest.fn(() => fakeMovies),
    getMovie: jest.fn((id) => fakeMovies.find((movie) => movie._id === id)),
    getMovieByName: jest.fn((name) => fakeMovies.find((movie) => movie.name === name)),
    updateMovie: jest.fn(() => fakeMovies[0]),
    deleteMovie: jest.fn(() => fakeMovies[0]),
    getMoviesByCategory: jest.fn((categoryId) => fakeMovies.filter((movie) => movie.categoryId === categoryId))
}));


describe('Test movie service', () => {
    let service;
    beforeEach(() => {
        service = new MovieService();
        jest.clearAllMocks();
    });

    describe('test for addMovie', () => {
        test('should return a movie', async () => {
            const movie = await service.addMovie({
                name: 'The Godfather',
                realeaseDate: '1972-03-24',
                duration: 175,
                mpaaCategory: 'R',
                format: '2D',
                description: 'The aging patriarch',
                categoryId: '1'
            });
            expect(movie).toEqual(expect.any(Object));
        });
    });

    describe('test for getMovie', () => {
        test('should return a movie', async () => {
            const movie = await service.getMovie('1');
            expect(movie).toEqual(expect.any(Object));
        });

        test('should throw an error if movie does not exist', async () => {
            await expect(service.getMovie('2')).rejects.toThrow(Boom);
        });
    });

    describe('test for getMovies', () => {
        test('should return an array of movies', async () => {
            const movies = await service.getMovies();
            expect(movies).toEqual(expect.any(Array));
        });
    });

    describe('test for getMovieByName', () => {
        test('should return a movie', async () => {
            const movie = await service.getMovieByName('The Shawshank Redemption');
            expect(movie).toEqual(expect.any(Object));
        });

        test('should throw an error if movie does not exist', async () => {
            await expect(service.getMovieByName('The Godfather')).rejects.toThrow(Boom);
        });
    });

    describe('test for updateMovie', () => {
        test('should return a movie', async () => {
            const movie = await service.updateMovie('1', {
                name: 'The Shawshank Redemption',
                realeaseDate: '1994-09-23',
                duration: 142,
                mpaaCategory: 'R',
                format: '3D',
                description: 'Two imprisoned',
                categoryId: '1'
            });
            expect(movie).toEqual(expect.any(Object));
        });

        test('should throw an error if movie does not exist', async () => {
            await expect(service.updateMovie('2', {
                name: 'The Shawshank Redemption',
                realeaseDate: '1994-09-23',
                duration: 142,
                mpaaCategory: 'R',
                format: '3D',
                description: 'Two imprisoned',
                categoryId: '1'
            })).rejects.toThrow(Boom);
        });
    });

    describe('test for deleteMovie', () => {
        test('should return a movie', async () => {
            const movie = await service.deleteMovie('1');
            expect(movie).toEqual(expect.any(Object));
        });

        test('should throw an error if movie does not exist', async () => {
            await expect(service.deleteMovie('2')).rejects.toThrow(Boom);
        });
    });

    describe('test for getMoviesByCategory', () => {
        test('should return an array of movies', async () => {
            const movies = await service.getMoviesByCategory('1');
            expect(movies).toEqual(expect.any(Array));
        });

        test('should throw an error if category does not exist', async () => {
            await expect(service.getMoviesByCategory('2')).rejects.toThrow(Boom);
        });
    });
});