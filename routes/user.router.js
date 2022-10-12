const express = require('express');
const UserService = require('../services/user.service');
const ValidatorHandler = require('../middlewares/validator.handler');
const { checkRoles } = require('../middlewares/auth.handler');
const { createUserSchema, updateUserSchema, getUserSchema } = require('../schemas/user.schema');
const passport = require('passport');

const router = express.Router();
const service = new UserService();

router.get('/',
    passport.authenticate('jwt', { session: false }),
    checkRoles(['admin', 'employee']),
    async (req, res, next) => {
        try {
            const users = await service.getUsers();
            res.status(200).json({
                data: users,
                message: 'users listed'
            });
        } catch (err) {
            next(err);
        }
    });

router.get('/admins',
    passport.authenticate('jwt', { session: false }),
    checkRoles(['admin']),
    async (req, res, next) => {
        try {
            const users = await service.getAdmins();
            res.status(200).json({
                data: users,
                message: 'admins listed'
            });
        } catch (err) {
            next(err);
        }
    });

router.get('/employees',
    passport.authenticate('jwt', { session: false }),
    checkRoles(['admin']),
    async (req, res, next) => {
        try {
            const users = await service.getEmployees();
            res.status(200).json({
                data: users,
                message: 'employees listed'
            });
        } catch (err) {
            next(err);
        }
    });

router.get('/clients',
    passport.authenticate('jwt', { session: false }),
    checkRoles(['admin', 'employee']),
    async (req, res, next) => {
        try {
            const users = await service.getClients();
            res.status(200).json({
                data: users,
                message: 'clients listed'
            });
        } catch (err) {
            next(err);
        }
    });

router.get('/:email',
    passport.authenticate('jwt', { session: false }),
    checkRoles(['admin', 'employee', 'client']),
    ValidatorHandler(getUserSchema, 'params'),
    async (req, res, next) => {
        const { email } = req.params;
        try {
            const user = await service.getUserByEmail(email);
            delete user.password;
            res.status(200).json({
                data: user,
                message: 'user retrieved'
            });
        } catch (err) {
            next(err);
        }
    });

router.post('/',
    ValidatorHandler(createUserSchema, 'body'),
    async (req, res, next) => {
        const { body: user } = req;
        try {
            const createdUserId = await service.addUser(user);
            res.status(201).json({
                data: createdUserId,
                message: 'user created'
            });
        } catch (err) {
            next(err);
        }
    });

router.put('/:email',
    passport.authenticate('jwt', { session: false }),
    checkRoles(['admin', 'employee', 'client']),
    ValidatorHandler(updateUserSchema, 'body'),
    async (req, res, next) => {
        const { body: user } = req;
        try {
            const updatedUserId = await service.updateUser(req.params.email, user);
            res.status(200).json({
                data: updatedUserId,
                message: 'user updated'
            });
        } catch (err) {
            next(err);
        }
    });

router.delete('/:email',
    passport.authenticate('jwt', { session: false }),
    checkRoles(['admin']),
    ValidatorHandler(getUserSchema, 'params'),
    async (req, res, next) => {
        const { email } = req.params;
        try {
            const deletedUserId = await service.deleteUser(email);
            res.status(200).json({
                data: deletedUserId,
                message: 'user deleted'
            });
        } catch (err) {
            next(err);
        }
    });

module.exports = router;
