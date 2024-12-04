// Creating custom error class which extends the default error class. Hence it inherits all the properties of error class and overrides some according to need

class ApiError extends Error {
    constructor(statusCode = 500, message = "Internal Server Error", errors = [], stack = "") {
        super();
        this.statusCode = statusCode;
        this.message = message;
        this.errors = errors;
        if (stack) this.stack = stack;
        else Error.captureStackTrace(this, this.constructor);
    }
}

export default ApiError;