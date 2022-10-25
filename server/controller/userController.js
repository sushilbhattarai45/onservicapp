import userSchema from "../model/userSchema.js";
import multer from "multer";
import {} from "dotenv/config";
const API_KEY = process.env.API_KEY;
import saltHash from "password-salt-and-hash";

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
      return res.json({ statuscode: 600, message: "User already exists" });
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
    return res.status(200).json({ fileName: req.file.path });
  }
  return res.status(400).json({ error: "failed to upload file " });
};

export const loginUser = async (req, res) => {
  const { user_num, user_pass, GIVEN_API_KEY } = req.body;
  if (API_KEY == GIVEN_API_KEY) {
    try {
      const loginUser = await userSchema.find({
        user_contact: user_num,
        user_password: user_pass,
      });
      // return res.json({ data: loginUser });
      if (loginUser.length != 0) {
        return res.json({
          statuscode: 200,
          message: "user found",
          pass: user_pass,
          num: user_num,
        });
      } else {
        return res.json({
          statuscode: 404,
          message: "user  not  exists",
          pass: user_pass,
          num: user_num,
        });
      }
    } catch (error) {
      return res.status(500).send(error);
    }
  } else {
    return res.json({ error: "Error! Wrong Api Key", statuscode: 700 });
  }
};

export const getAllUser = async (req, res) => {
  const { GIVEN_API_KEY } = req.body;
  if (API_KEY == GIVEN_API_KEY) {
    try {
      const allUser = await userSchema.find();
      return res.json({ data: allUser });
    } catch (e) {
      return res.json({ error: e });
    }
  } else {
    return res.json({ error: "error" });
  }
};

export const getOneUser = async (req, res) => {
  const { GIVEN_API_KEY, user_contact } = req.body;
  if (API_KEY == GIVEN_API_KEY) {
    try {
      const getOneUser = await userSchema.findOne({
        user_contact: user_contact,
      });
      return res.json({ data: getOneUser });
    } catch (e) {
      return res.json({ error: e });
    }
  } else {
    return res.json({ error: "Wrong Api Key", statuscode: 700 });
  }
};
