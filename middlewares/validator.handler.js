const boom = require('@hapi/boom');
const validatorHandler = (shcema, property) => {
    return (req, res, next) => {
        const { error } = shcema.validate(req[property], { abortEarly: false });
        if (error) {
            next(boom.badRequest(error));
        }
        next();
    };
};

module.exports = validatorHandler;