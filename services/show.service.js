const boom = require('@hapi/boom');
const Show = require('../models/show.model');
const Theater = require('../models/theater.model');
const Movie = require('../models/movie.model');

class ShowService {
    async addShow(show) {
        const movie = await Movie.getMovie(show.movieId);
        const theater = await Theater.getTheater(show.theaterId);
        show.movieId = movie;
        show.theaterId = theater;
        return Show.addShow(show);
    }

    async getShows() {
        return Show.getShows();
    }

    async getShow(id) {
        const show = await Show.getShow(id);
        if (!show) {
            throw boom.notFound('Show not found');
        }
        return show;
    }

    async getShowsByMovieId(movieId) {
        const movie = await Movie.getMovie(movieId);
        return Show.getShowsByMovieId(movie);
    }

    async getShowsByTheaterId(id) {
        const theater = await Theater.getTheater(id);
        return Show.getShowsByTheaterId(theater);
    }

    async getShowsByDate(date) {
        return Show.getShowsByDate(date);
    }

    async updateShow(id, show) {
        const movie = await Movie.getMovie(show.movieId);
        const theater = await Theater.getTheater(show.theaterId);
        show.movieId = movie;
        show.theaterId = theater;
        const oldShow = await Show.getShow(id);
        if (!oldShow) {
            throw boom.notFound('Show not found');
        }
        return Show.updateShow(id, show);
    }

    async deleteShow(id) {
        const show = await Show.getShow(id);
        if (!show) {
            throw boom.notFound('Show not found');
        }
        return Show.deleteShow(id);
    }
}

module.exports = ShowService;