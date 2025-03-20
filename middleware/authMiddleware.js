const jwt = require('jsonwebtoken'); // Make sure to install this package

function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer')) {
        return res.status(401).json({ msg: "Authentication invalid: No token provided" });
    }

    // Assuming the token is in the format "Bearer <token>"
    const token = authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ msg: "Authentication invalid: Malformed token" });
    }

    try {
        const {username,userid} = jwt.verify(token, process.env.JWT_SECRET);
        req.user = {username,userid}; // Attach the decoded user data to the request object
        next(); // Pass control to the next middleware or route handler
    } catch (error) {
        console.log(error.message);
        return res.status(401).json({ msg: "Authentication invalid: Invalid token" });
    }
}

module.exports = authMiddleware;