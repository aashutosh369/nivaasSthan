import userModel from "../model/user.model.js";

export const getCurrentUser = async (req, res) => {
  try {
    if (!req.userId) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No userId found in request" });
    }
    let user = await userModel.findById(req.userId).select("-password");
    if (!user) {
      res.status(400).json({ massage: "User doesn't found!" });
    }
    return res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ massage: `getCurrentUser error ${error}` });
  }
};
