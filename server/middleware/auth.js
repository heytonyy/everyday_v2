import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    try {
        const token = req.header("Authorization");
        if (!token) {
            return res.status(400).json({ msg: "Invalid authentication" });
        }
        if (token.startsWith("Bearer ")) {
            token = token.slice(7, token.length);
        }
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                return res.status(400).json({ msg: "Invalid authentication" });
            }
            req.user = user;
            next();
        });
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
};