const express = require('express');
const authRouter = require('./auth.router');
const userRouter = require('./user.router');

const routerApi = (app) => {
    const router = express.Router();
    app.use('/api', router);
    router.use('/auth', authRouter);
    router.use('/user', userRouter);
}

module.exports = routerApi;