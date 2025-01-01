import jwt from "jsonwebtoken";
import { responseJSON } from "../helpers/index.js";

async function jwtAuthorization(req, res, next) {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json(responseJSON.error("Authorization token missing or malformed"));
        }

        const token = authHeader.split(" ")[1];
        if (!token) {
            return res.status(401).json(responseJSON.error("Token not found in authorization header"));
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            if (!decoded) {
                return res.status(401).json(responseJSON.error("Invalid token",{
                    redirect:"/signin"
                }));
            }
            req.body.id = decoded.id;
            next();
        } catch (error) {
            if (error.name === "TokenExpiredError") {
                return res.status(401).json(responseJSON.error("Token expired"));
            } else if (error.name === "JsonWebTokenError") {
                return res.status(401).json(responseJSON.error("Invalid token"));
            }
            throw error;
        }
    } catch (error) {
        console.error("Authorization error:", error);
        return res.status(500).json(responseJSON.error("Unable to authorize at this moment. Please try again later."));
    }
}

export {
    jwtAuthorization
};
