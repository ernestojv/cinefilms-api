const boom = require('@hapi/boom');
const Show = require('../models/show.model');

class ShowService {
    async addShow(show) {
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
        return Show.getShowsByMovieId(movieId);
    }

    async getShowsByTheaterId(id) {
        return Show.getShowsByTheaterId(id);
    }

    async getShowsByDate(date) {
        return Show.getShowsByDate(date);
    }

    async updateShow(id, show) {
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