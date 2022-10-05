const boom = require('@hapi/boom');
const Theater = require('../models/theater.model');

class TheaterService {
    async addTheater(theater) {
        const existingTheater = await Theater.getTheaterByName(theater.name);
        if (existingTheater) {
            throw boom.conflict('Theater already exists');
        }
        return Theater.addTheater(theater);
    }

    async getTheaters() {
        return Theater.getTheaters();
    }

    async getTheater(id) {
        const theater = await Theater.getTheater(id);
        if (!theater) {
            throw boom.notFound('Theater not found');
        }
        return theater;
    }

    async updateTheater(id, theater) {
        const oldTheater = await Theater.getTheater(id);
        if (!oldTheater) {
            throw boom.notFound('Theater not found');
        }
        return Theater.updateTheater(id, theater);
    }

    async deleteTheater(id) {
        const theater = await Theater.getTheater(id);
        if (!theater) {
            throw boom.notFound('Theater not found');
        }
        return Theater.deleteTheater(id);
    }
}

module.exports = TheaterService;
