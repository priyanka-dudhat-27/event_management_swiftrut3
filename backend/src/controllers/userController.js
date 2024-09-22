import User from "../models/userModel.js"
import Event from "../models/eventModel.js"

const getUser=async(req,res)=>{
    try {
        const user=req.user;
        return res.status(200).json({ user });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const logout = async (req, res) => {
    try {
      res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        sameSite: "None",
      });
      res.status(200).json({ message: "Logged out successfully!!!!" });
    } catch (error) {
      return res.status(500).json({ message: "logout : " + error.message });
    }
  };

  const profilePic = async (req, res) => {
    const { image } = req.body;
    const image_Id = extractPublicId(image);
  
    try {
      if (!image) return res.status(422).json({ message: "Fill all the inputs" });
  
      const OldImage = req.user.image ? extractPublicId(req.user.image) : null;
      if (OldImage) await deleteImageByUrl(`users/${OldImage}`, res);
  
      const response = await userModel.findByIdAndUpdate(
        req.user._id,
        { $set: { image } },
        {
          new: true,
        }
      );
  
      if (response) return res.status(201).json({ message: "Profile Picture Uploaded Successfully" });
      else return res.status(422).json({ message: response.message });
    } catch (error) {
      if (image_Id) await deleteImageByUrl(`users/${image_Id}`, res);
      return res.status(500).json({ message: error.message });
    }
  };

  const removeProfilePic = async (req, res) => {
    try {
      const OldImage = req.user.image ? extractPublicId(req.user.image) : null;
      if (OldImage) await deleteImageByUrl(`users/${OldImage}`, res);
  
      const response = await userModel.findByIdAndUpdate(
        req.user._id,
        { $set: { image: defaultImag } },
        {
          new: true,
        }
      );
  
      if (response) return res.status(201).json({ message: "Profile Picture Removed Successfully" });
      else return res.status(422).json({ message: response.message });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };

  module.exports={getUser,logout,profilePic,removeProfilePic }
