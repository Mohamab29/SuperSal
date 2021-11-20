const jwt = require("jsonwebtoken");


function getNewToken(user) {
    const payload = {
        user
    };
    return jwt.sign(payload, global.config.JWT_KEY, { expiresIn: "30m" });
}

module.exports ={
    getNewToken
}