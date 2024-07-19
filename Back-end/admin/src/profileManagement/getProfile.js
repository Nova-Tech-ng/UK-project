import Admin from "../../../models/Admin.js";

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
    const adminMail = req.user.email;

    const admin = await Admin.findOne({ email: adminMail }).select("-password");

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    res.json(admin);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch profile", error: error.message });
  }
};

export default getProfile;
