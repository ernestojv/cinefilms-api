const errorHandler = (err, req, res) => {
    res.status(500).json({ 
        message: err.message,
        stack: err.stack 
    });
}

const boomErrorHandler = (err, req, res, next) => {
    if(err.isBoom) {
        res.status(err.output.statusCode).json(err.output.payload);
    }else{
        next(err);
    }
    
}

module.exports = {
    errorHandler,
    boomErrorHandler
};