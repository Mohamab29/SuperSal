function internalServerError(response, error) {
    // return errors with status 500 if we are in development 
    if (global.config.isDevelopment) {
        if (error.code && error.code === 11000) {
            return response.status(500).send("Duplicate id or username")
        }
        return response.status(500).send(error.message);
    }

    return response.status(500).send("please try again later.");
}
function mongooseError(error) {
    let message = "";
    const errors = error.errors;
    for (const err in errors) {
        message = message + errors[err].message + ", ";
    }
    const commaIndex  = message.lastIndexOf(", ");
    message = message.slice(0, commaIndex) + ".";
    return message;
}

module.exports = {
    internalServerError,
    mongooseError
};