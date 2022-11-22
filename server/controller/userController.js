import userSchema from "../model/userSchema.js";
import multer from "multer";
import {} from "dotenv/config";
const API_KEY = process.env.API_KEY;
import bcrypt from "bcrypt";
import spSchema from "../model/spSchema.js";
export const updateUser = async (req, res) => {
  const {
    user_name,
    user_email,
    user_contact,
    user_district,
    user_city,
    user_street,
    user_gender,
    user_status,
    user_toc,
    user_profileImage,
  } = req.body;
  try {
    const exists = await userSchema.findOne({ user_contact: user_contact });
    if (!exists || exists?.length == 0) {
      return res.json({ statuscode: 600, message: "User Doesnot exists" });
    } else {
      const userData = await userSchema.findOneAndUpdate(
        { user_contact: user_contact },
        {
          user_name: user_name,
          user_email: user_email,
          user_contact: user_contact,
          user_status: user_status,
          user_district: user_district,
          user_city: user_city,
          user_street: user_street,
          user_gender: user_gender,
          user_profileImage: user_profileImage,
        }
      );
      const updatedData = await userSchema.find({
        user_contact: user_contact,
      });

      const spUpdate = await spSchema.findOneAndUpdate(
        { sp_contact: user_contact },
        {
          sp_profileImage: user_profileImage,
        }
      );
      console.log(spUpdate);

      return res.json({ statuscode: 201, user: updatedData });
    }
  } catch (e) {
    console.log(e);
    return res.status(400).json({
      error: "Sry there is some error in our side",
    });
  }
};

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
    const password = bcrypt.hashSync(user_password, 10);
    console.log(password);
    const exists = await userSchema.findOne({ user_contact: user_contact });
    if (!exists || exists?.length == 0) {
      const user = new userSchema({
        user_name: user_name,
        user_email: user_email,
        user_contact: user_contact,
        user_district: user_district,
        user_city: user_city,
        user_street: user_street,
        user_gender: user_gender,
        user_password: password,
        user_toc: user_toc,
        user_profileImage: user_profileImage,
      });
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
      const loginUser = await userSchema.findOne({
        user_contact: user_num,
      });

      const password = bcrypt.compareSync(user_pass, loginUser?.user_password);
      console.log(password);
      // return res.json({ data: loginUser });
      if (password) {
        return res.json({
          statuscode: 200,
          message: "user found",
          pass: password,
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
export const forgetPin = async (req, res) => {
  const { GIVEN_API_KEY, user_contact, user_password } = req.body;

  const password = bcrypt.hashSync(user_password, 10);

  if (API_KEY == GIVEN_API_KEY) {
    try {
      const updated = await userSchema.findOneAndUpdate(
        { user_contact: user_contact },
        {
          user_password: password,
        }
      );
      return res.json({ statuscode: 201, data: updated });
    } catch (e) {
      return res.json({ error: e, statuscode: 400 });
    }
  } else {
    return res.json({ error: "error" });
  }
};

export const getOneUser = async (req, res) => {
  const { GIVEN_API_KEY, user_contact } = req.body;
  if (API_KEY == GIVEN_API_KEY) {
    try {
      console.log(user_contact);
      const getUser = await userSchema.findOne({
        user_contact: user_contact,
      });

      if (getUser) {
        return res.json({
          message: "user found",
          statuscode: 201,
          data: getUser,
        });
      } else {
        return res.json({ message: "user not found", statuscode: 400 });
      }
    } catch (e) {
      return res.json({ error: e });
    }
  } else {
    return res.json({ error: "Wrong Api Key", statuscode: 700 });
  }
};

export const deleteUser = async (req, res) => {
  const { GIVEN_API_KEY, user_contact } = req.body;
  if (GIVEN_API_KEY == API_KEY) {
    try {
      const exists = await userSchema.findOne({ user_contact: user_contact });

      // return res.json({ data: exists, id: id });
      if (exists || exists?.length == 0) {
        const user = await userSchema.findOneAndDelete({
          user_contact: user_contact,
        });
        return res.json({
          statuscode: 200,
          message: "Sucessfully deleted  data of given id",
        });
      } else {
        return res.json({
          error: "No Data Found for Given id",
          statusCode: 400,
        });
      }
    } catch (e) {
      return res.json({ error: e });
    }
  } else {
    return res.json({
      statuscode: 700,
      error: "WrongApi Key",
    });
  }
};
