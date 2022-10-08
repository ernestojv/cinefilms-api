const express = require('express');
const CategoryService = require('../services/category.service');
const validatorHandler = require('../middlewares/validator.handler');
const { checkRoles } = require('../middlewares/auth.handler');
const { createCategorySchema, updateCategorySchema, getCategorySchema } = require('../schemas/category.schema');
const passport = require('passport');

const router = express.Router();
const service = new CategoryService();

router.get('/',
    passport.authenticate('jwt', { session: false }),
    checkRoles(['admin', 'employee', 'client']),
    async (req, res, next) => {
        try {
            const categories = await service.getCategories();
            res.status(200).json({
                data: categories,
                message: 'categories listed'
            });
        } catch (err) {
            next(err);
        }
    });

router.get('/name/:name',
    passport.authenticate('jwt', { session: false }),
    checkRoles(['admin', 'employee', 'client']),
    async (req, res, next) => {
        const { name } = req.params;
        try {
            const category = await service.getCategoryByName(name);
            res.status(200).json({
                data: category,
                message: 'category retrieved'
            });
        } catch (err) {
            next(err);
        }
    });

router.get('/:id',
    passport.authenticate('jwt', { session: false }),
    checkRoles(['admin', 'employee', 'client']),
    validatorHandler(getCategorySchema, 'params'),
    async (req, res, next) => {
        const { id } = req.params;
        try {
            const category = await service.getCategory(id);
            res.status(200).json({
                data: category,
                message: 'category retrieved'
            });
        } catch (err) {
            next(err);
        }
    });


router.post('/',
    passport.authenticate('jwt', { session: false }),
    checkRoles(['admin']),
    validatorHandler(createCategorySchema, 'body'),
    async (req, res, next) => {
        const { body: category } = req;
        try {
            const createdCategoryId = await service.addCategory(category);
            res.status(201).json({
                data: createdCategoryId,
                message: 'category created'
            });
        } catch (err) {
            next(err);
        }
    });

router.put('/:id',
    passport.authenticate('jwt', { session: false }),
    checkRoles(['admin']),
    validatorHandler(updateCategorySchema, 'body'),
    validatorHandler(getCategorySchema, 'params'),
    async (req, res, next) => {
        const { id } = req.params;
        const { body: category } = req;
        try {
            const updatedCategoryId = await service.updateCategory(id, category);
            res.status(200).json({
                data: updatedCategoryId,
                message: 'category updated'
            });
        } catch (err) {
            next(err);
        }
    });

router.delete('/:id',
    passport.authenticate('jwt', { session: false }),
    checkRoles(['admin']),
    validatorHandler(getCategorySchema, 'params'),
    async (req, res, next) => {
        const { id } = req.params;
        try {
            const deletedCategoryId = await service.deleteCategory(id);
            res.status(200).json({
                data: deletedCategoryId,
                message: 'category deleted'
            });
        } catch (err) {
            next(err);
        }
    });

module.exports = router;