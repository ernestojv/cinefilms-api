const express = require('express');
const PurchaseService = require('../services/purchase.service');
const validatorHandler = require('../middlewares/validator.handler');
const { checkRoles } = require('../middlewares/auth.handler');
const { createPurchaseSchema, updatePurchaseSchema, getPurchaseSchema } = require('../schemas/purchase.schema');
const passport = require('passport');
const router = express.Router();
const service = new PurchaseService();

router.get('/',
    passport.authenticate('jwt', { session: false }),
    checkRoles(['admin']),
    async (req, res, next) => {
        try {
            const purchases = await service.getPurchases();
            res.status(200).json({
                data: purchases,
                message: 'purchases listed'
            });
        } catch (err) {
            next(err);
        }
    }
);

router.get('/:id',
    passport.authenticate('jwt', { session: false }),
    checkRoles(['admin', 'employee', 'client']),
    validatorHandler(getPurchaseSchema, 'params'),
    async (req, res, next) => {
        const { id } = req.params;
        try {
            const purchase = await service.getPurchase(id);
            res.status(200).json({
                data: purchase,
                message: 'purchase retrieved'
            });
        } catch (err) {
            next(err);
        }
    }
);

router.get('/user/:id',
    passport.authenticate('jwt', { session: false }),
    checkRoles(['admin', 'employee', 'client']),
    validatorHandler(getPurchaseSchema, 'params'),
    async (req, res, next) => {
        const { id } = req.params;
        try {
            const purchases = await service.getPurchasesByUserId(id);
            res.status(200).json({
                data: purchases,
                message: 'purchases retrieved'
            });
        } catch (err) {
            next(err);
        }
    }
);


router.get('/show/:id',
    passport.authenticate('jwt', { session: false }),
    checkRoles(['admin', 'employee']),
    validatorHandler(getPurchaseSchema, 'params'),
    async (req, res, next) => {
        const { id } = req.params;
        try {
            const purchases = await service.getPurchasesByShowId(id);
            res.status(200).json({
                data: purchases,
                message: 'purchases retrieved'
            });
        } catch (err) {
            next(err);
        }
    }
);

router.get('/date/:date',
    passport.authenticate('jwt', { session: false }),
    checkRoles(['admin', 'employee']),
    async (req, res, next) => {
        const { date } = req.params;
        try {
            const purchases = await service.getPurchasesByDate(date);
            res.status(200).json({
                data: purchases,
                message: 'purchases retrieved'
            });
        } catch (err) {
            next(err);
        }
    }
);

router.get('/date/:startDate/:endDate',
    passport.authenticate('jwt', { session: false }),
    checkRoles(['admin', 'employee']),
    async (req, res, next) => {
        const { startDate, endDate } = req.params;
        try {
            const purchases = await service.getPurchasesByDateRange(startDate, endDate);
            res.status(200).json({
                data: purchases,
                message: 'purchases retrieved'
            });
        } catch (err) {
            next(err);
        }
    }
);

router.post('/',
    passport.authenticate('jwt', { session: false }),
    checkRoles(['admin', 'employee', 'client']),
    validatorHandler(createPurchaseSchema, 'body'),
    async (req, res, next) => {
        const { body: purchase } = req;
        try {
            const createdPurchaseId = await service.addPurchase(purchase);
            res.status(201).json({
                data: createdPurchaseId,
                message: 'purchase created'
            });
        } catch (err) {
            next(err);
        }
    }
);

router.put('/:id',
    passport.authenticate('jwt', { session: false }),
    checkRoles(['admin']),
    validatorHandler(getPurchaseSchema, 'params'),
    validatorHandler(updatePurchaseSchema, 'body'),
    async (req, res, next) => {
        const { id } = req.params;
        const { body: purchase } = req;
        try {
            const updatedPurchaseId = await service.updatePurchase(id, purchase);
            res.status(200).json({
                data: updatedPurchaseId,
                message: 'purchase updated'
            });
        } catch (err) {
            next(err);
        }
    }
);

router.delete('/:id',
    passport.authenticate('jwt', { session: false }),
    checkRoles(['admin']),
    validatorHandler(getPurchaseSchema, 'params'),
    async (req, res, next) => {
        const { id } = req.params;
        try {
            const deletedPurchaseId = await service.deletePurchase(id);
            res.status(200).json({
                data: deletedPurchaseId,
                message: 'purchase deleted'
            });
        } catch (err) {
            next(err);
        }
    }
);


module.exports = router;
