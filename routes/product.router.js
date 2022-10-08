const express = require('express');
const ProductService = require('../services/product.service');
const validatorHandler = require('../middlewares/validator.handler');
const { checkRoles } = require('../middlewares/auth.handler');
const { createProductSchema, updateProductSchema, getProductSchema } = require('../schemas/product.schema');
const passport = require('passport');
const router = express.Router();
const service = new ProductService();

router.get('/',
    async (req, res, next) => {
        try {
            const products = await service.getProducts();
            res.status(200).json({
                data: products,
                message: 'products listed'
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
            const product = await service.getProductsByName(name);
            res.status(200).json({
                data: product,
                message: 'product retrieved'

            });
        } catch (err) {
            next(err);
        }
    }
);

router.get('/:id',
    validatorHandler(getProductSchema, 'params'),
    async (req, res, next) => {
        const { id } = req.params;
        try {
            const product = await service.getProduct(id);
            res.status(200).json({
                data: product,
                message: 'product retrieved'
            });
        } catch (err) {
            next(err);
        }
    }
);

router.post('/',
    passport.authenticate('jwt', { session: false }),
    checkRoles(['admin']),
    validatorHandler(createProductSchema, 'body'),
    async (req, res, next) => {
        const body = req.body;
        try {
            const createdProduct = await service.addProduct(body);
            res.status(201).json({
                data: createdProduct,
                message: 'product created'
            });
        } catch (err) {
            next(err);
        }
    }
);

router.put('/:id',
    passport.authenticate('jwt', { session: false }),
    checkRoles(['admin']),
    validatorHandler(getProductSchema, 'params'),
    validatorHandler(updateProductSchema, 'body'),
    async (req, res, next) => {
        const { id } = req.params;
        const body = req.body;
        try {
            const updatedProduct = await service.updateProduct(id, body);
            res.status(200).json({
                data: updatedProduct,
                message: 'product updated'
            });
        } catch (err) {
            next(err);
        }
    }
);

router.delete('/:id',
    passport.authenticate('jwt', { session: false }),
    checkRoles(['admin']),
    validatorHandler(getProductSchema, 'params'),
    async (req, res, next) => {
        const { id } = req.params;
        try {
            const deletedProduct = await service.deleteProduct(id);
            res.status(200).json({
                data: deletedProduct,
                message: 'product deleted'
            });
        } catch (err) {
            next(err);
        }
    }
);

module.exports = router;