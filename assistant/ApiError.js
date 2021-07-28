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
    static NotFound(msg) {
        return new BaseError(msg, httpStatusCodes.NOT_FOUND, 'Not found.');
    }
    static BadRequest(msg) {
        return new BaseError(msg, httpStatusCodes.BAD_REQUEST, 'invalid request.');
    }
    static UnprocessableEntity (msg) {
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
    } else if(typeof err.errors === "object") {
        res.status(422).json({
            status: "validotor error",
            statusCode: 422,
            message: err.errors[0].msg
        });
    } else {
        res.status(500).json({ error: "Internal Server Error" })
    }
  };

module.exports = { handleError, BaseError };