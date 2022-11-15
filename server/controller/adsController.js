import moment from "moment";
import {} from "dotenv/config";
import adsSchema from "../model/adsSchema.js";
const API_KEY = process.env.API_KEY;

export const postAds = async (req, res) => {
  const {
    GIVEN_API_KEY,
    ads_name,
    ads_givenEmail,
    ads_link,
    ads_location,
    ads_mediaLink,
    ads_type,
    ads_status,
    ads_updatedBy
  } = req.body;
  if (GIVEN_API_KEY == API_KEY) {
    const ads_toc = {
      date: moment().format("ll"),
      time: moment().format("LT"),
    };
    try {
      const ads = new adsSchema({
        ads_toc,
        ads_name,
        ads_link,
        ads_givenEmail,
        ads_mediaLink,
        ads_updatedBy,
        ads_status,
        ads_type,
        ads_location
      } );
      console.log("ok"+ads)
      const data = await ads.save();
      return res.json({ message: "Done", statuscode: 201, data: data });
    } catch (e) {
      return res.json({ error: " Server side error" });
    }
  } else {
    return res.json({ statuscode: 700, error: "Wrong Api Key" });
  }
};
export const deleteAds = async (req, res) => {
  const { GIVEN_API_KEY, _id } = req.body;
  if (GIVEN_API_KEY == API_KEY) {
    try {
      const data = await adsSchema.deleteOne({
        _id: _id,
      });
      return res.json({
        message: "Deleted",
        statuscode: 201,
      });
    } catch (e) {
      return res.json({ error: " Server side error" });
    }
  } else {
    return res.json({ statuscode: 700, error: "Wrong Api Key" });
  }
};

export const updateAds = async (req, res) => {
  const {
    GIVEN_API_KEY,
    _id,
    ads_name,
    ads_givenEmail,
    ads_updatedBy,
    ads_status,
    ads_link,
    ads_location,
    ads_type,
  } = req.body;
  if (GIVEN_API_KEY == API_KEY) {
    try {
      const data = await adsSchema.findOneAndUpdate(
        {
          _id: _id,
        },
        {
          ads_name: ads_name,
          ads_status: ads_status,
          ads_location: ads_location,
          ads_type: ads_type,
          ads_updatedBy: ads_updatedBy,
          ads_givenEmail: ads_givenEmail,
          ads_link: ads_link,
        }
      );
      return res.json({
        message: "Successfully Updated",
        statuscode: 201,
      });
    } catch (e) {
      return res.json({ error: " Server side error" });
    }
  } else {
    return res.json({ statuscode: 700, error: "Wrong Api Key" });
  }
};

export const deleteAllAds = async (req, res) => {
  const { GIVEN_API_KEY } = req.body;
  if (GIVEN_API_KEY == API_KEY) {
    try {
      const data = await adsSchema.remove();
      return res.json({
        message: "Deleted",
        statuscode: 201,
      });
    } catch (e) {
      return res.json({ error: " Server side error" });
    }
  } else {
    return res.json({ statuscode: 700, error: "Wrong Api Key" });
  }
};
export const getAds = async (req, res) => {
  const { GIVEN_API_KEY } = req.body;
  if (GIVEN_API_KEY == API_KEY) {
    try {
      const hometopimages = await adsSchema.find({
        ads_status: "true",
        ads_type: "IMAGE",
        ads_location:"HOMETOP"
      });
       const homebottomimages = await adsSchema.find({
        ads_status: "true",
        ads_type: "IMAGE",
        ads_location:"HOMEBOTTOM"
       });
        const homeVideo = await adsSchema.find({
        ads_status: "true",
        ads_type: "VIDEO",
        ads_location:"HOMEVIDEO"
        });
         const bookmark = await adsSchema.find({
        ads_status: "true",
        ads_type: "IMAGE",
        ads_location:"BMIMAGE"
      });
      
      return res.json({
        hometop:hometopimages,
                homebottom:homebottomimages,
        homevideo: homeVideo,
bookmarkimage:bookmark,
        message: "Deleted",
        statuscode: 201,
      });
    } catch (e) {
      return res.json({ error: " Server side error" });
    }
  } else {
    return res.json({ statuscode: 700, error: "Wrong Api Key" });
  }
};
