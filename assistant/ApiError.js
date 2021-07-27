const httpStatusCodes = {
    OK: 200,
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    INVALID_REQEST: 422,
    INTERNAL_SERVER: 500
   }

class BaseError extends Error {
    constructor(message, statusCode, description) {
        super(description);
        Object.setPrototypeOf(this, new.target.prototype);
        this.message = message;
        this.statusCode = statusCode;
        this.description = description;
        Error.captureStackTrace(this);
    }
    static Error404(msg) {
        return new BaseError(msg, httpStatusCodes.NOT_FOUND, 'Not found.');
    }
    static Error400(msg) {
        return new BaseError(msg, httpStatusCodes.BAD_REQUEST, 'invalid request.');
    }
    static Error422(msg) {
        return new BaseError(msg, httpStatusCodes.INVALID_REQEST, 'Invalid fields in request.');
    }
    static AnyError(msg, statusCode, description) {
        return new BaseError(msg, statusCode, description);
    }
    
}

function handleError(err, req, res, next) {
    if(err instanceof BaseError) {
        const { statusCode, message, description } = err;
        res.status(statusCode).json({
        status: description,
        statusCode,
        message
        });
    } else {
        res.status(500).json({ error: "Internal Server Error" })
    }
  };

module.exports = { handleError, BaseError };