const express = require('express');
const ShowService = require('../services/show.service');
const validatorHandler = require('../middlewares/validator.handler');
const { getShowSchema, createShowSchema, updateShowSchema } = require('../schemas/show.schema');
const passport = require('passport');
const { checkRoles } = require('../middlewares/auth.handler');
const router = express.Router();
const service = new ShowService();

router.get('/',
    async (req, res, next) => {
        try {
            const shows = await service.getShows();
            res.status(200).json({
                data: shows,
                message: 'shows listed'
            });
        } catch (err) {
            next(err);
        }
    }
);

router.get('/:id',
    validatorHandler(getShowSchema, 'params'),
    async (req, res, next) => {
        const { id } = req.params;
        try {
            const show = await service.getShow(id);
            res.status(200).json({
                data: show,
                message: 'show retrieved'
            });
        } catch (err) {
            next(err);
        }
    }
);

router.get('/movie/:id',
    validatorHandler(getShowSchema, 'params'),
    async (req, res, next) => {
        const { id } = req.params;
        try {
            const shows = await service.getShowsByMovieId(id);
            res.status(200).json({
                data: shows,
                message: 'shows retrieved'
            });
        } catch (err) {
            next(err);
        }
    }
);

router.get('/theater/:id',
    validatorHandler(getShowSchema, 'params'),
    passport.authenticate('jwt', { session: false }),
    checkRoles(['admin', 'employee']),
    async (req, res, next) => {
        const { id } = req.params;
        try {
            const shows = await service.getShowsByTheaterId(id);
            res.status(200).json({
                data: shows,
                message: 'shows retrieved'
            });
        } catch (err) {
            next(err);
        }
    }
);

router.get('/date/:date',
    async (req, res, next) => { 
        const { date } = req.params;
        try {
            const shows = await service.getShowsByDate(date);
            res.status(200).json({
                data: shows,
                message: 'shows retrieved'
            });
        } catch (err) {
            next(err);
        }
    }
);

router.post('/',
    passport.authenticate('jwt', { session: false }),
    checkRoles(['admin']),
    validatorHandler(createShowSchema, 'body'),
    async (req, res, next) => {
        const body = req.body;
        try {
            const show = await service.addShow(body);
            res.status(201).json({
                data: show,
                message: 'show created'
            });
        } catch (err) {
            next(err);
        }
    }
);

router.put('/:id',
    passport.authenticate('jwt', { session: false }),
    checkRoles(['admin']),
    validatorHandler(getShowSchema, 'params'),
    validatorHandler(updateShowSchema, 'body'),
    async (req, res, next) => {
        const { id } = req.params;
        const body = req.body;
        try {
            const show = await service.updateShow(id, body);
            res.status(200).json({
                data: show,
                message: 'show updated'
            });
        } catch (err) {
            next(err);
        }
    }
);

router.delete('/:id',
    passport.authenticate('jwt', { session: false }),
    checkRoles(['admin']),
    validatorHandler(getShowSchema, 'params'),
    async (req, res, next) => {
        const { id } = req.params;
        try {
            const show = await service.deleteShow(id);
            res.status(200).json({
                data: show,
                message: 'show deleted'
            });
        } catch (err) {
            next(err);
        }
    }
);


module.exports = router;