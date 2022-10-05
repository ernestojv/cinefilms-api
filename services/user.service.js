const boom = require('@hapi/boom');
const User = require('../models/user.model');

class UserService {
    async addUser(user) {
        const existingUser = await User.getUserByEmail(user.email);
        if (existingUser) {
            throw boom.conflict('User already exists');
        }
        return User.addUser(user);
    }

    async getUsers() {
        return User.getUsers();
    }

    async getUser(id) {
        const user = await User.getUser(id);
        if (!user) {
            throw boom.notFound('User not found');
        }
        return user;
    }

    async updateUser(id, user) {
        const oldUser = await User.getUser(id);
        if (!oldUser) {
            throw boom.notFound('User not found');
        }
        return User.updateUser(id, user);
    }

    async deleteUser(id) {
        const user = await User.getUser(id);
        if (!user) {
            throw boom.notFound('User not found');
        }
        return User.deleteUser(id);
    }
}

module.exports = UserService;