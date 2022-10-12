const { Boom } = require('@hapi/boom');
const UserService = require('../../services/user.service');
const fakeUsers = [
    {
        _id: '1',
        name: 'User 1',
        email: 'no@no.com',
        password: '123456',
        role: 'admin',
    },
    {
        _id: '2',
        name: 'User 2',
        email: 'no2@no.com',
        password: '123456',
        role: 'employee',
    },
    {
        _id: '3',
        name: 'User 3',
        email: 'no3@no.com',
        password: '123456',
        role: 'client',
    },
];

jest.mock('../../models/user.model', () => ({
    addUser: jest.fn((user) => user),
    getUsers: jest.fn(() => fakeUsers),
    getUser: jest.fn((id) => fakeUsers.find((user) => user._id === id)),
    getUserByEmail: jest.fn((email) => fakeUsers.find((user) => user.email === email)),
    getAdmins: jest.fn(() => fakeUsers.filter((user) => user.role === 'admin')),
    getEmployees: jest.fn(() => fakeUsers.filter((user) => user.role === 'employee')),
    getClients: jest.fn(() => fakeUsers.filter((user) => user.role === 'client')),
    updateUser: jest.fn((email) => fakeUsers.find((user) => user.email === email)),
    deleteUser: jest.fn((email) => fakeUsers.find((user) => user.email === email)),
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
                name: 'User 4',
                email: 'no4@no.com',
                password: '123456',
                role: 'admin',
            };
            const result = await service.addUser(user);
            expect(result).toEqual(expect.any(Object));
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
            await expect(service.getUser('5')).rejects.toThrow(Boom);
        });
    });

    describe('getUsers', () => {
        test('should return an array of users', async () => {
            const result = await service.getUsers();
            expect(result).toEqual(fakeUsers);
        });
    });

    describe('getUserByEmail', () => {
        test('should return a user', async () => {
            const result = await service.getUserByEmail('no@no.com');
            expect(result).toEqual(expect.any(Object));
        });
        test('should throw an error if user does not exist', async () => {
            await expect(service.getUserByEmail('no5@no.com')).rejects.toThrow(Boom);
        });
    });

    describe('getAdmins', () => {
        test('should return an array of admins', async () => {
            const result = await service.getAdmins();
            expect(result).toEqual(fakeUsers.filter((user) => user.role === 'admin'));
        });

        test('should return an empty array if no admins exist', async () => {
            const result = await service.getAdmins();
            expect(result).toEqual(expect.any(Array));
        });
    });

    describe('getEmployees', () => {
        test('should return an array of employees', async () => {
            const result = await service.getEmployees();
            expect(result).toEqual(fakeUsers.filter((user) => user.role === 'employee'));
        });

        test('should return an empty array if no employees exist', async () => {
            const result = await service.getEmployees();
            expect(result).toEqual(expect.any(Array));
        });
    });

    describe('getClients', () => {
        test('should return an array of clients', async () => {
            const result = await service.getClients();
            expect(result).toEqual(fakeUsers.filter((user) => user.role === 'client'));
        });

        test('should return an empty array if no clients exist', async () => {
            const result = await service.getClients();
            expect(result).toEqual(expect.any(Array));
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
            const result = await service.updateUser('no@no.com', user);
            expect(result).toEqual(fakeUsers[0]);
        });
        test('should throw an error if user does not exist', async () => {
            const user = {
                name: 'User 5',
                email: 'no5@no.com',
                password: '123456',
                role: 'admin',
            };
            await expect(service.updateUser('no5@no.com', user)).rejects.toThrow(Boom);
        });
    });

    describe('deleteUser', () => {
        test('should delete a user', async () => {
            const result = await service.deleteUser('no@no.com');
            expect(result).toEqual(fakeUsers[0]);
        });
        test('should throw an error if user does not exist', async () => {
            await expect(service.deleteUser('no5@no.com')).rejects.toThrow(Boom);
        });
    });
});