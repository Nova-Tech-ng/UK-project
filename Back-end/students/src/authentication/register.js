// /student/src/authentication/register.js
import Student from "../../../models/Student.js";
import jwt from "jsonwebtoken";

/**
 * @author 010binary
 * @param {*} req
 * @param {*} res
 * @returns
 */

const register = async (req, res) => {
  try {
    const { name, email, password, schoolName } = req.body;
    const existingStudent = await Student.findOne({ email });

    if (existingStudent) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const newStudent = new Student({ name, email, password, schoolName });
    await newStudent.save();

    const token = jwt.sign(
      { id: newStudent._id, email: newStudent.email },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.status(201).json({ message: "Student registered successfully", token });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Registration failed", error: error.message });
  }
};

export default register;
