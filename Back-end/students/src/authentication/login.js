// /student/src/authentication/login.js
import Student from "../../../models/Student.js";
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
    const student = await Student.findOne({ email });

    if (!student || student.password !== password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: student._id, email: student.email },
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
