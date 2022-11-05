import spSchema from "../model/spSchema.js";
import {} from "dotenv/config";
const API_KEY = process.env.API_KEY;
export const test = async (req, res) => {
  res.send("okkk");
};

export const postSp = async (req, res) => {
  const {
    GIVEN_API_KEY,
    sp_name,
    user_id,
    sp_email,
    sp_contact,
    sp_district,
    sp_officenumber,
    sp_skills,
    sp_city,
    sp_street,
    sp_gender,
    sp_password,
    sp_location,
    sp_toc,
    sp_profileImage,
    sp_media,
  } = req.body;

  if (GIVEN_API_KEY == API_KEY) {
    try {
      const exists = await spSchema.findOne({ sp_contact: sp_contact });
      if (!exists || exists?.length == 0) {
        const sp = new spSchema(req.body);
        const spData = await sp.save();
        return res.json({ statuscode: 201, sp: spData });
      } else {
        return res.json({ statuscode: 600, message: "sp already exists" });
      }
    } catch (e) {
      return res.status(400).json({
        error: "Sry there is some error in our side",
      });
    }
  } else {
    return res.json({ statuscode: 700, message: "Wrong Api Key" });
  }
};

export const getAllSp = async (req, res) => {
  const { GIVEN_API_KEY } = req.body;
  if (GIVEN_API_KEY == API_KEY) {
    try {
      const spdata = await spSchema.find();
      return res.json({ statuscode: 201, data: spdata });
    } catch (e) {
      return res.json({
        error: "Sry there is some error in our side",
      });
    }
  } else {
    return res.json({ statuscode: 700, message: "Wrong Api Key" });
  }
};

export const getOneSp = async (req, res) => {
  const { GIVEN_API_KEY, sp_contact } = req.body;
  if (GIVEN_API_KEY == API_KEY) {
    try {
      const spdata = await spSchema.findOne({
        sp_contact: sp_contact,
      });
      return res.json({ statuscode: 201, data: spdata });
    } catch (e) {
      return res.json({
        error: "Sry there is some error in our side",
      });
    }
  } else {
    return res.json({ statuscode: 700, message: "Wrong Api Key" });
  }
};

export const getSearchedSp = async (req, res) => {
  const { GIVEN_API_KEY, city, skill } = req.body;
  if (GIVEN_API_KEY == API_KEY) {
    try {
      console.log(city);
      if (city && city !== "") {
        const spdata = await spSchema.find({
          sp_skills: skill,
          sp_district: city,
        });
        console.log(spdata);

        return res.json({ statuscode: 201, data: spdata });
      } else {
        const spdata = await spSchema.find({
          sp_skills: skill,
        });
        console.log(spdata);

        return res.json({ statuscode: 201, data: spdata });
      }
    } catch (e) {
      return res.json({
        error: "Sry there is some error in our side",
      });
    }
  } else {
    return res.json({ statuscode: 700, message: "Wrong Api Key" });
  }
};
