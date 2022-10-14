import categorySchema from "../model/categorySchema.js";
import moment from "moment";
import {} from "dotenv/config";
const API_KEY = process.env.API_KEY;

export const getAllCategories = async (req, res) => {
  const { GIVEN_API_KEY } = req.body;
  if (GIVEN_API_KEY == API_KEY) {
    try {
      const categories = await categorySchema.find();
      return res.json({
        statuscode: 200,
        data: categories,
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

export const postcategories = async (req, res) => {
  const {
    category_name,
    category_photo,
    category_showonhome,
    category_status,
    category_updatedby,
    GIVEN_API_KEY,
  } = req.body;

  const category_id = Date.now();
  const category_doc = {
    date: moment().format("ll"),
    time: moment().format("LT"),
  };
  const category_dou = {
    date: moment().format("ll"),
    time: moment().format("LT"),
  };
  if (GIVEN_API_KEY == API_KEY) {
    try {
      const exists = await categorySchema.findOne({
        category_name: category_name,
      });
      if (!exists || exists?.length == 0) {
        const category = new categorySchema({
          category_name,
          category_doc,
          category_photo,
          category_status,
          category_showonhome,
          category_updatedby,
          category_id,
          category_dou,
        });
        const postcategory = await category.save();

        return res.json({
          postcategory,
        });
      } else {
        return res.json({
          error: "Error category already exists",
          statuscode: 600,
        });
      }
    } catch (e) {
      return res.json({ error: e });
    }
  } else {
    return res.json({
      error: "Wrong API Key",
      statuscode: 700,
    });
  }
};

export const updateCategory = async (req, res) => {
  const {
    GIVEN_API_KEY,
    category_id,
    category_photo,
    category_status,
    category_showonhome,
    category_updatedby,
    category_name,
  } = req.body;
  if (API_KEY == GIVEN_API_KEY) {
    try {
      const category_dou = {
        date: moment().format("ll"),
        time: moment().format("LT"),
      };
      const update = await categorySchema.findOneAndUpdate(
        { _id: category_id },
        {
          category_status: category_status,
          category_photo: category_photo,
          category_name: category_name,
          category_showonhome: category_showonhome,
          category_updatedby: category_updatedby,
          category_dou: category_dou,
        }
      );
      const updateddata = await categorySchema.findById(category_id);
      return res.json({ "stauscode:": 200, data: updateddata });
    } catch (e) {
      res.json({ error: e });
    }
  } else {
    res.json({ error: "Wrong Api Key", statuscode: 700 });
  }
};
