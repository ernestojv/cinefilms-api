const { Boom } = require('@hapi/boom');
const UserService = require('../../services/user.service');

const fakeUsers = [
    {
        _id: '1',
        name: 'User 1',
        email: 'no@no.com',
        password: '123456',
        role: 'user',
    }
];

jest.mock('../../models/user.model', () => ({
    addUser: jest.fn(() => fakeUsers[0]),
    getUsers: jest.fn(() => fakeUsers),
    getUser: jest.fn((id) => fakeUsers.find((user) => user._id === id)),
    getUserByEmail: jest.fn((email) => fakeUsers.find((user) => user.email === email)),
    updateUser: jest.fn(() => fakeUsers[0]),
    deleteUser: jest.fn(() => fakeUsers[0])
}));

describe('UserService', () => {
    let service;
    beforeEach(() => {
        service = new UserService();
        jest.clearAllMocks();
    });

    describe('addUser', () => {
        test('should add a user', async () => {
            const user = {
                name: 'User 2',
                email: 'no2@no.com',
                password: '123456',
                role: 'user',
            };
            const result = await service.addUser(user);
            expect(result).toEqual(fakeUsers[0]);
        });

        test('should throw an error if user already exists', async () => {
            const user = {
                name: 'User 1',
                email: 'no@no.com',
                password: '123456',
                role: 'user',
            };
            await expect(service.addUser(user)).rejects.toThrow(Boom);
        });
    });

    describe('getUser', () => {
        test('should return a user', async () => {
            const result = await service.getUser('1');
            expect(result).toEqual(expect.any(Object));
        });

        test('should throw an error if user does not exist', async () => {
            await expect(service.getUser('2')).rejects.toThrow(Boom);
        });
    });

    describe('getUsers', () => {
        test('should return an array of users', async () => {
            const result = await service.getUsers();
            expect(result).toEqual(fakeUsers);
        });
    });

    describe('updateUser', () => {
        test('should update a user', async () => {
            const user = {
                name: 'User 1',
                email: 'no@no.com',
                password: '123456',
                role: 'user',
            };
            const result = await service.updateUser('1', user);
            expect(result).toEqual(fakeUsers[0]);
        });
        test('should throw an error if user does not exist', async () => {
            const user = {
                name: 'User 1',
                email: 'no@no.com',
                password: '123456',
                role: 'user',
            };
            await expect(service.updateUser('2', user)).rejects.toThrow(Boom);
        });
    });

    describe('deleteUser', () => {
        test('should delete a user', async () => {
            const result = await service.deleteUser('1');
            expect(result).toEqual(fakeUsers[0]);
        });
        test('should throw an error if user does not exist', async () => {
            await expect(service.deleteUser('2')).rejects.toThrow(Boom);
        });
    });
});