import ReviewSchema from "../model/reviewSchema.js";
import {} from "dotenv/config";
const API_KEY = process.env.API_KEY;
import moment from "moment";
export const postReview = async (req, res) => {
  const { GIVEN_API_KEY, user_contact, sp_contact, review_bio, review_stars } =
    req.body;
  const review_doc = {
    date: moment().format("ll"),
    time: moment().format("LT"),
  };
  if (GIVEN_API_KEY == API_KEY) {
    const data = new ReviewSchema({
      user_contact,
      sp_contact,
      review_bio,
      review_stars,
      review_doc,
    });
    const postData = await data.save();
    return res.json({ message: "Done", statuscode: 201, data: postData });
  } else {
    return res.json({ error: "Wrong Api Key", statuscode: 700 });
  }
};

export const getMyReview = async (req, res) => {
  const { GIVEN_API_KEY, sp_contact, user_contact } = req.body;

  if (GIVEN_API_KEY == API_KEY) {
    const postData = await ReviewSchema.find({
      sp_contact: sp_contact,
      user_contact: user_contact,
    });
    if (postData.length != 0) {
      return res.json({
        message: "Done",
        statuscode: 201,
        data: postData,
      });
    } else {
      return res.json({
        message: "No Data",
        statuscode: 404,
      });
    }
  } else {
    return res.json({ error: "Wrong Api Key", statuscode: 700 });
  }
};

export const getOneSpReview = async (req, res) => {
  const { GIVEN_API_KEY, sp_contact } = req.body;

  if (GIVEN_API_KEY == API_KEY) {
    const postData = await ReviewSchema.find({
      sp_contact: sp_contact,
    });
    if (postData.length != 0) {
      return res.json({
        message: "Done",
        statuscode: 201,
        data: postData,
      });
    } else {
      return res.json({
        message: "No Data",
        statuscode: 404,
      });
    }
  } else {
    return res.json({ error: "Wrong Api Key", statuscode: 700 });
  }
};

export const deleteAllReviews = async (req, res) => {
  const { GIVEN_API_KEY } = req.body;
  if (GIVEN_API_KEY == API_KEY) {
    try {
      const deleteReview = await ReviewSchema.remove();
      return res.json({
        statuscode: 200,
        message: "sucessfully deleted all data",
      });
    } catch (e) {
      return res.json({ error: e });
    }
  } else {
    return res.json({
      statuscode: 600,
      error: "WrongApi Key",
    });
  }
};
