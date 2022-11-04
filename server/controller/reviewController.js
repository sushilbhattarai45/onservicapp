import ReviewSchema from "../model/reviewSchema.js";
import UserSchema from "../model/userSchema.js";
import {} from "dotenv/config";
const API_KEY = process.env.API_KEY;
import moment from "moment";
import userSchema from "../model/userSchema.js";
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
    //  const setRatings = await ReviewSchema.find({
    //       sp_contact: sp_contact,
    //  });

    // setRatings.data.map((item) => {

    // })

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
    const uid = [];
    const udata = [];
    let postData = await ReviewSchema.find({
      sp_contact: sp_contact,
    });
    postData.map(async (item) => {
      uid.push(item.user_contact);
    });

    uid.map(async (item) => {
      const d = await userSchema.find({
        user_contact: item,
      });
      udata.push(d);
    });

    if (postData.length != 0) {
      return res.json({
        message: "Done",
        statuscode: 201,
        review_data: postData,
        user_data: udata,
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
