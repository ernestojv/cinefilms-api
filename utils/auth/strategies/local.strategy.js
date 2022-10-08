const { Strategy } = require('passport-local');
const bcrypt = require('bcrypt');
const boom = require('@hapi/boom');

const UserService = require('../../../services/user.service');
const service = new UserService();

const LocalStrategy = new Strategy(async (email, password, done) => {
    try{
        const user = await service.getUserByEmail(email);
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            done(boom.unauthorized(), false);
        }
        delete user.password;
        done(null, user);
    }catch(err){
        done(err, false);
    }
});

module.exports = LocalStrategy;