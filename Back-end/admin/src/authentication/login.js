// /admin/src/authentication/login.js
import Admin from "../../../models/Admin.js";
import jwt from "jsonwebtoken";

/**
 * @author 010binary
 * @param {*} req
 * @param {*} res
 * @returns
 */

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });

    if (!admin || admin.password !== password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: admin._id, email: admin.email },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: "Login failed", error: error.message });
  }
};

export default login;
