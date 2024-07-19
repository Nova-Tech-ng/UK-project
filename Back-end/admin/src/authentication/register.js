// /admin/src/authentication/register.js
import Admin from "../../../models/Admin.js";
import jwt from "jsonwebtoken";

/**
 * @author 010binary
 * @param {*} req
 * @param {*} res
 * @returns
 */

const register = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingAdmin = await Admin.findOne({ email });

    if (existingAdmin) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const newAdmin = new Admin({ email, password });
    await newAdmin.save();

    const token = jwt.sign(
      { id: newAdmin._id, email: newAdmin.email },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.status(201).json({ message: "Admin registered successfully", token });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Registration failed", error: error.message });
  }
};

export default register;
