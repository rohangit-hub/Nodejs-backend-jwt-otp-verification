import jwt from "jsonwebtoken"
import dotenv from "dotenv";
dotenv.config()


const verifyJwtToken = async (req, res, next) => {

    const token = req.cookies.Token;

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    // Now you can verify the token using a JWT library "jwt.veryfy(token, secret-key, (err, data) => {})"
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid token' });
        }
        req.user = decoded;
        next();
    });
}

export default verifyJwtToken;