import express from "express";
import register from "./authentication/register.js";
import login from "./authentication/login.js";
import getProfile from "./profilemanagement/getProfile.js";
import jwtMiddleware from "../../middleware/jwtMiddleware.js";

/**
 * @author 010binary
 * @param {*} req
 * @param {*} res
 * @returns
 */

const router = express.Router();

// Public routes (no JWT required)
router.post("/register", register);
router.post("/login", login);

// Protected routes (JWT required)
router.get("/profile", jwtMiddleware, getProfile);

export default router;
