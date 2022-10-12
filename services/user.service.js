const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const User = require('../models/user.model');

class UserService {
    async addUser(user) {
        const existingUser = await User.getUserByEmail(user.email);
        if (existingUser) {
            throw boom.conflict('User already exists');
        }
        const password = await bcrypt.hash(user.password, 10);
        return User.addUser({ ...user, password });
    }

    async getUsers() {
        const users = await User.getUsers();
        users.map(user => {
            delete user.password;
        })
        return users;
    }

    async getUser(id) {
        const user = await User.getUser(id);
        if (!user) {
            throw boom.notFound('User not found');
        }
        delete user.password;
        return user;
    }

    async getUserByEmail(email) {
        const user = await User.getUserByEmail(email);
        if (!user) {
            throw boom.notFound('User not found');
        }
        return user;
    }

    async getAdmins() {
        const users = await User.getAdmins();
        users.map(user => {
            delete user.password;
        })
        return users;
    }

    async getEmployees() {
        const users = await User.getEmployees();
        users.map(user => {
            delete user.password;
        })
        return users;
    }

    async getClients() {
        const users = await User.getClients();
        users.map(user => {
            delete user.password;
        })
        return users;
    }

    async updateUser(email, user) {
        const oldUser = await User.getUserByEmail(email);
        if (!oldUser) {
            throw boom.notFound('User not found');
        }
        return User.updateUser(email, user);
    }

    async deleteUser(email) {
        const user = await User.getUserByEmail(email);
        if (!user) {
            throw boom.notFound('User not found');
        }
        return User.deleteUser(email);
    }
}

module.exports = UserService;