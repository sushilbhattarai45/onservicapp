import userSchema from "../model/userSchema.js";
import multer from "multer";

export const registerUser = async (req, res) => {
  const {
    user_name,
    user_email,
    user_contact,
    user_district,
    user_city,
    user_street,
    user_gender,
    user_password,
    user_toc,
    user_profileImage,
  } = req.body;

  try {
    const exists = await userSchema.findOne({ user_contact: user_contact });
    if (!exists || exists?.length == 0) {
      const user = new userSchema(req.body);
      const userData = await user.save();
      return res.json({ statuscode: 201, user: userData });
    } else {
      return res.json({ statuscode: 600, message: "user already exists" });
    }
  } catch (e) {
    console.log(e);
    return res.status(400).json({
      error: "Sry there is some error in our side",
    });
  }
};

// export const userExistance = async (req, res) => {
//   const id = req.body?.num;
//   const exists = await userSchema.findOne({ user_contact: num });
//   if (!exists || exists?.length == 0)
//     return res.status(404).json({ msg: "User not found" });
//   return res.status(200).json({
//     msg: "user exists ",
//   });
// };
export const uploadImage = async (req, res) => {
  // const imageToUpload = req.data;

  // the image url in the server
  // const serverImageUrl = "someUrl";
  console.log("The incomming req is here" + req);
  console.log({ "function File": req.file });

  if (req.file) {
    return res.status(200).json({ fileName: req.file.path })};
  return res.status(400).json({ error: "failed to upload file " });
};

export const loginUser = async (req, res) => {
  const { user_contact, user_password } = req.body;
  try {
    const loginUser = await userSchema.findOne({
      user_contact: user_contact,
      user_password: user_password,
    });
    if (!loginUser) {
      return res.json({ statuscode: 403, message: "user not found" });
    } else {
      return res.json({ statuscode: 201, message: "user  exists" });
    }
  } catch (error) {
    return res.status(500).send(error);
  }
};
