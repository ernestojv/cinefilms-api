const express = require('express');
const MovieService = require('../services/movie.service');
const validatorHandler = require('../middlewares/validator.handler');
const { checkRoles } = require('../middlewares/auth.handler');
const { createMovieSchema, updateMovieSchema, getMovieSchema } = require('../schemas/movie.schema');
const passport = require('passport');
const router = express.Router();
const service = new MovieService();

router.get('/',
    async (req, res, next) => {
        try {
            const movies = await service.getMovies();
            res.status(200).json({
                data: movies,
                message: 'movies listed'
            });
        } catch (err) {
            next(err);
        }
    }
);

router.get('/name/:name',
    async (req, res, next) => {
        const { name } = req.params;
        try {
            const movie = await service.getMovieByName(name);
            res.status(200).json({
                data: movie,
                message: 'movie retrieved'
            });
        } catch (err) {
            next(err);
        }
    }
);

router.get('/category/:categoryId',
    async (req, res, next) => {
        const { categoryId } = req.params;
        try {
            const movies = await service.getMoviesByCategory(categoryId);
            res.status(200).json({
                data: movies,
                message: 'movies listed'
            });
        } catch (err) {
            next(err);
        }
    }
);

router.get('/:id',
    validatorHandler(getMovieSchema, 'params'),
    async (req, res, next) => {
        const { id } = req.params;
        try {
            const movie = await service.getMovie(id);
            res.status(200).json({
                data: movie,
                message: 'movie retrieved'
            });
        } catch (err) {
            next(err);
        }
    }
);

router.post('/',
    passport.authenticate('jwt', { session: false }),
    checkRoles(['admin']),
    validatorHandler(createMovieSchema, 'body'),
    async (req, res, next) => {
        const { body: movie } = req;
        try {
            const createdMovieId = await service.addMovie(movie);
            res.status(201).json({
                data: createdMovieId,
                message: 'movie created'
            });
        } catch (err) {
            next(err);
        }
    }
);

router.put('/:id',
    passport.authenticate('jwt', { session: false }),
    checkRoles(['admin']),
    validatorHandler(getMovieSchema, 'params'),
    validatorHandler(updateMovieSchema, 'body'),
    async (req, res, next) => {
        const { id } = req.params;
        const { body: movie } = req;
        try {
            const updatedMovieId = await service.updateMovie(id, movie);
            res.status(200).json({
                data: updatedMovieId,
                message: 'movie updated'
            });
        } catch (err) {
            next(err);
        }
    }
);

router.delete('/:id',
    passport.authenticate('jwt', { session: false }),
    checkRoles(['admin']),
    validatorHandler(getMovieSchema, 'params'),
    async (req, res, next) => {
        const { id } = req.params;
        try {
            const deletedMovieId = await service.deleteMovie(id);
            res.status(200).json({
                data: deletedMovieId,
                message: 'movie deleted'
            });
        } catch (err) {
            next(err);
        }
    }
);

module.exports = router;