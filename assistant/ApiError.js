const httpStatusCodes = {
    OK: 200,
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    INTERNAL_SERVER: 500
   }

class BaseError extends Error {
    constructor(message, statusCode, description) {
        super(description);
        Object.setPrototypeOf(this, new.target.prototype);
        this.message = message;
        this.statusCode = statusCode;
        Error.captureStackTrace(this);
    }
}

class Api404Error extends BaseError {
    constructor (message, statusCode = httpStatusCodes.NOT_FOUND, description = 'Not found.') {
        super(message, statusCode, description); 
    }
}

const handleError = (err, req, res, next) => {
    const { statusCode, message } = err;
    res.status(statusCode).json({
      status: "error",
      statusCode,
      message
    });
  };

module.exports = { handleError, Api404Error };