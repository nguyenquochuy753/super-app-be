const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    try {
        const token = req.headers.authorization;

        if (!token) {
            return res.status(401).json({ message: 'Token is required' });
        }

        jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
            if (err) {
                return res.status(403).json({ message: 'Invalid token' });
            }
            req.user = decoded.user;
            next();
        });
    } catch (error) {
        res.status(500).json(error);
    }
};

module.exports = verifyToken;