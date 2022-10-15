import moment from "moment";
import {} from "dotenv/config";
const API_KEY = process.env.API_KEY;
import subcategoriesSchema from "../model/subCatSchema.js";
export const postSubCategories = async (req, res) => {
  const {
    GIVEN_API_KEY,
    subCat_name,
    subCat_photo,
    category_id,
    subCat_status,
    subCat_updatedby,
  } = req.body;
  const subCat_doc = {
    date: moment().format("ll"),
    time: moment().format("LT"),
  };
  const subCat_dou = {
    date: moment().format("ll"),
    time: moment().format("LT"),
  };
  if (GIVEN_API_KEY == API_KEY) {
    try {
      const exists = await subcategoriesSchema.findOne({
        subCat_name: subCat_name,
      });
      if (!exists || exists?.length == 0) {
        const postSubCat = await subcategoriesSchema({
          subCat_name,
          subCat_photo,
          subCat_status,
          category_id,
          subCat_updatedby,
          subCat_doc,
          subCat_dou,
        });

        const savepostSubCat = await postSubCat.save();
        return res.json({
          statuscode: 200,
          data: savepostSubCat,
        });
      } else {
        return res.json({
          statuscode: 600,
          error: "sub Category Already Exists",
        });
      }
    } catch (e) {
      return res.json({ error: e });
    }
  } else {
    return res.json({ error: "Wrong Api Key", statusCode: 700 });
  }
};

export const updateSubCategory = async (req, res) => {
  const {
    GIVEN_API_KEY,
    subCategory_id,
    subCategory_photo,
    subCategory_status,
    subCategory_updatedby,
    subCategory_name,
    category_id,
  } = req.body;
  if (API_KEY == GIVEN_API_KEY) {
    try {
      const subCategory_dou = {
        date: moment().format("ll"),
        time: moment().format("LT"),
      };
      const update = await subcategoriesSchema.findOneAndUpdate(
        { _id: subCategory_id },
        {
          subCat_status: subCategory_status,
          subCat_photo: subCategory_photo,
          subCat_name: subCategory_name,
          category_id: category_id,
          subCat_updatedby: subCategory_updatedby,
          subCat_dou: subCategory_dou,
        }
      );
      const updateddata = await subcategoriesSchema.findById(subCategory_id);
      return res.json({ "stauscode:": 200, data: updateddata });
    } catch (e) {
      return res.json({ error: e });
    }
  } else {
    return res.json({ error: "Wrong Api Key", statuscode: 700 });
  }
};
export const getAllSubCat = async (req, res) => {
  const { GIVEN_API_KEY } = req.body;
  if (API_KEY == GIVEN_API_KEY) {
    try {
      const data = await subcategoriesSchema.find();
      return res.json({
        status: 200,
        data: data,
      });
    } catch (e) {
      res.json({ error: e });
    }
  } else {
    return res.json({ error: "Wrong Api Key", statuscode: 700 });
  }
};
export const getFilteredSubCat = async (req, res) => {
  const { GIVEN_API_KEY, category_id } = req.body;
  if (API_KEY == GIVEN_API_KEY) {
    try {
      const data = await subcategoriesSchema.find({
        category_id: category_id,
        subCat_status: false,
      });

      return res.json({
        status: 200,
        data: data,
      });
    } catch (e) {
      res.json({ error: e });
    }
  } else {
    return res.json({ error: "Wrong Api Key", statuscode: 700 });
  }
};