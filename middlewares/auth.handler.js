const boom = require('@hapi/boom');
const checkRoles = (roles) => {
    return (req, res, next) => {
        const user = req.user;
        if (roles.includes(user.role)) {
            next();
        } else {
            next(boom.unauthorized('You are not authorized to access this resource'));
        }
    }
}

module.exports = { checkRoles };