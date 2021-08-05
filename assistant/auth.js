const jwt = require("jsonwebtoken");
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (!token) {
        return res.status(403).send("A token is required for authentication");
    }
    try {
        //console.log(process.env.TOKEN_SECRET);
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = decoded;
        //console.log("verify decoded", decoded);
    } catch (e) {
        return res.status(401).send("Invalid Token");
    }
    return next();
};

module.exports = verifyToken;