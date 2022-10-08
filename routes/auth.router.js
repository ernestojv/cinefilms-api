const express = require('express');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const config = require('../config/config');

const UserService = require('../services/user.service');

const router = express.Router();
const userService = new UserService();

router.post('/login',
    passport.authenticate('local', { session: false }),
    async (req, res, next) => {
        try {
            const user = req.user;
            const payload = {
                sub: user.email,
                role: user.role,
            }
            const token = jwt.sign(payload, config.jwtSecret);
            res.send({
                token
            });
        } catch (err) {
            next(err);
        }
    });

router.get('/profile',
    passport.authenticate('jwt', { session: false }),
    async (req, res, next) => {
        try {
            let loggedUser = req.user;
            let user = await userService.getUserByEmail(loggedUser.sub);
            delete user.password;
            delete user.email;
            loggedUser = { ...loggedUser, ...user };
            res.status(200).send(loggedUser);
        } catch (err) {
            next(err);
        }
    }
);

module.exports = router;