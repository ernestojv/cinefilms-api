const boom = require('@hapi/boom');
const Show = require('../models/show.model');

class ShowService {
    async addShow(show) {
        const existingShow = await Show.getShowByName(show.name);
        if (existingShow) {
            throw boom.conflict('Show already exists');
        }
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
        const show = await Show.getShowsByMovieId(movieId);
        if (!show) {
            throw boom.notFound('Show not found');
        }
        return show;
    }

    async getShowsByTheaterId(id) {
        const show = await Show.getShowsByTheaterId(id);
        if (!show) {
            throw boom.notFound('Show not found');
        }
        return show;
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