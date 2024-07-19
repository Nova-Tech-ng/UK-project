import Student from "../../../models/Student.js";

/**
 * @author 010binary
 * @param {*} req
 * @param {*} res
 * @returns
 */

const getProfile = async (req, res) => {
  try {
    // The middleware has already checked for a valid token
    // and added user info to req.user
    const studentMail = req.user.email;

    const student = await Student.findOne({ email: studentMail }).select(
      "-password"
    );

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json(student);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch profile", error: error.message });
  }
};

export default getProfile;
