// middleware/jwtMiddleware.js
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const secretKey = process.env.JWT_SECRET;

const jwtMiddleware = (req, res, next) => {
  if (req.path.endsWith("/login") || req.path.endsWith("/register")) {
    return next();
  }

  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Access token missing or invalid" });
  }

  try {
    const decoded = jwt.verify(token, secretKey);

    // Add the decoded token information to the request object
    req.user = {
      id: decoded.id,
      email: decoded.email,
    };

    next();
  } catch (error) {
    return res
      .status(403)
      .json({ message: "Token verification failed", error: error.message });
  }
};

export default jwtMiddleware;
