import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET || "supersecret";
export const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Authorization token missing" });
    }
    const token = authHeader.slice(7);
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        if (!decoded.id) {
            return res.status(401).json({ error: "Invalid token payload" });
        }
        req.userId = decoded.id;
        next();
    }
    catch {
        return res.status(401).json({ error: "Invalid or expired token" });
    }
};
//# sourceMappingURL=authMiddleware.js.map