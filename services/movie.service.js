const boom = require('@hapi/boom');
const Movie = require('../models/movie.model');
const Category = require('../models/category.model');
class MovieService {
    async addMovie(movie) {
        let category = await Category.getCategory(movie.categoryId);
        movie.categoryId = category
        return Movie.addMovie(movie);
    }

    async getMovies() {
        return Movie.getMovies();
    }

    async getMovie(id) {
        const movie = await Movie.getMovie(id);
        if (!movie) {
            throw boom.notFound('Movie not found');
        }
        return movie;
    }

    async getMovieByName(name) {
        const movie = await Movie.getMovieByName(name);
        if (!movie) {
            throw boom.notFound('Movie not found');
        }
        return movie;
    }

    async updateMovie(id, movie) {
        const oldMovie = await Movie.getMovie(id);
        if (!oldMovie) {
            throw boom.notFound('Movie not found');
        }
        let category = await Category.getCategory(movie.categoryId);
        movie.categoryId = category
        return Movie.updateMovie(id, movie);
    }

    async deleteMovie(id) {
        const movie = await Movie.getMovie(id);
        if (!movie) {
            throw boom.notFound('Movie not found');
        }
        return Movie.deleteMovie(id);
    }

    async getMoviesByCategory(categoryId) {
        const category = await Category.getCategory(categoryId);
        const movies = await Movie.getMoviesByCategory(category);
        if (movies.length === 0) {
            throw boom.notFound('Movies not found for this category');
        }
        return movies;
    }
}

module.exports = MovieService;