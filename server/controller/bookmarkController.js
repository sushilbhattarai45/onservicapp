import bookmarkSchema from "../model/bookmarkSchema.js";
import moment from "moment";
import spSchema from "../model/spSchema.js";
import {} from "dotenv/config";
const API_KEY = process.env.API_KEY;

export const getBm = async (req, res) => {
  const { GIVEN_API_KEY, user_id } = req.body;
  if (GIVEN_API_KEY == API_KEY) {
    try {
      const bm_spidData = [];
      const bm_spData = [];

      const data = await bookmarkSchema.find({
        user_id: user_id,
      });

      data.map((item) => {
        bm_spidData.push(item.sp_id);
      });
      let i = 0;
      bm_spidData.map(async (item) => {
        const spData = await spSchema.find({ _id: item });
        bm_spData.push(spData);
        i++;
        if (i == data.length) {
          return res.json({
            message: "Done",
            statuscode: 201,
            data: bm_spData,
          });
        }
      });
    } catch (e) {
      return res.json({ error: " Server side error" });
    }
  } else {
    return res.json({ statuscode: 700, error: "Wrong Api Key" });
  }
};

export const postBm = async (req, res) => {
  const { GIVEN_API_KEY, sp_id, user_id } = req.body;
  if (GIVEN_API_KEY == API_KEY) {
    const bm_doc = {
      date: moment().format("ll"),
      time: moment().format("LT"),
    };
    try {
      const bm = new bookmarkSchema({
        user_id,
        sp_id,
        bm_doc,
      });
      const data = await bm.save();
      return res.json({ message: "Done", statuscode: 201, data: data });
    } catch (e) {
      return res.json({ error: " Server side error" });
    }
  } else {
    return res.json({ statuscode: 700, error: "Wrong Api Key" });
  }
};
