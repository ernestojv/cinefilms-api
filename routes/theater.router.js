const express = require('express');
const TheaterService = require('../services/theater.service');
const validatorHandler = require('../middlewares/validator.handler');
const { createTheaterSchema, updateTheaterSchema, getTheaterSchema } = require('../schemas/theater.schema');
const passport = require('passport');
const { checkRoles } = require('../middlewares/auth.handler');
const router = express.Router();
const service = new TheaterService();

router.get('/',
    passport.authenticate('jwt', { session: false }),
    checkRoles(['admin', 'employee']),
    async (req, res, next) => {
        try {
            const theaters = await service.getTheaters();
            res.status(200).json({
                data: theaters,
                message: 'theaters listed'
            });
        } catch (err) {
            next(err);
        }
    }
);

router.get('/:id',
    validatorHandler(getTheaterSchema, 'params'),
    passport.authenticate('jwt', { session: false }),
    checkRoles(['admin', 'employee']),
    async (req, res, next) => {
        const { id } = req.params;
        try {
            const theater = await service.getTheater(id);
            res.status(200).json({
                data: theater,
                message: 'theater retrieved'
            });
        } catch (err) {
            next(err);
        }
    }
);

router.post('/',
    validatorHandler(createTheaterSchema),
    passport.authenticate('jwt', { session: false }),
    checkRoles(['admin']),
    async (req, res, next) => {
        const { body: theater } = req;
        try {
            const createdTheaterId = await service.addTheater(theater);
            res.status(201).json({
                data: createdTheaterId,
                message: 'theater created'
            });
        } catch (err) {
            next(err);
        }
    }
);

router.put('/:id',
    validatorHandler(getTheaterSchema, 'params'),
    validatorHandler(updateTheaterSchema),
    passport.authenticate('jwt', { session: false }),
    checkRoles(['admin']),
    async (req, res, next) => {
        const { id } = req.params;
        const { body: theater } = req;
        try {
            const updatedTheaterId = await service.updateTheater(id, theater);
            res.status(200).json({
                data: updatedTheaterId,
                message: 'theater updated'
            });
        } catch (err) {
            next(err);
        }
    }
);

router.delete('/:id',
    validatorHandler(getTheaterSchema, 'params'),
    passport.authenticate('jwt', { session: false }),
    checkRoles(['admin']),
    async (req, res, next) => {
        const { id } = req.params;
        try {
            const deletedTheaterId = await service.deleteTheater(id);
            res.status(200).json({
                data: deletedTheaterId,
                message: 'theater deleted'
            });
        } catch (err) {
            next(err);
        }
    }
);

module.exports = router;