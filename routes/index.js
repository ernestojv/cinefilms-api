const express = require('express');
const authRouter = require('./auth.router');
const userRouter = require('./user.router');
const categoryRouter = require('./category.router');
const movieRouter = require('./movie.router');
const productRouter = require('./product.router');
const purchaseRouter = require('./purchase.router');

const routerApi = (app) => {
    const router = express.Router();
    app.use('/api', router);
    router.use('/auth', authRouter);
    router.use('/user', userRouter);
    router.use('/category', categoryRouter);
    router.use('/movie', movieRouter);
    router.use('/product', productRouter);
    router.use('/purchase', purchaseRouter);
}

module.exports = routerApi;