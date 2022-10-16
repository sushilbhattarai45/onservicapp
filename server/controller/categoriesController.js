import categorySchema from "../model/categorySchema.js";
import moment from "moment";
import {} from "dotenv/config";
import subcategoriesSchema from "../model/subCatSchema.js";
const API_KEY = process.env.API_KEY;

export const getAllCategories = async (req, res) => {
  const { GIVEN_API_KEY } = req.body;
  console.log("apiKEy", GIVEN_API_KEY);
  if (GIVEN_API_KEY == API_KEY) {
    try {
      const categories = await categorySchema.find();
      return res.json(categories);
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
    id,
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

      const exists = await categorySchema.findOne({
        category_name: category_name,
      });
      if (exists || exists?.length == 0) {
        const update = await categorySchema.findOneAndUpdate(
          { _id: id },
          {
            category_status: category_status,
            category_photo: category_photo,
            category_name: category_name,
            category_showonhome: category_showonhome,
            category_updatedby: category_updatedby,
            category_dou: category_dou,
          }
        );
        const updateddata = await categorySchema.findById(id);
        return res.json({ "stauscode:": 200, data: updateddata });
      } else {
        return res.json({
          error: "No data found for the given Category id",
          statuscode: 400,
        });
      }
    } catch (e) {
      res.json({ error: e });
    }
  } else {
    res.json({ error: "Wrong Api Key", statuscode: 700 });
  }
};
export const deleteAllCategories = async (req, res) => {
  const { GIVEN_API_KEY } = req.body;
  if (GIVEN_API_KEY == API_KEY) {
    try {
      const categories = await categorySchema.remove();
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

export const deleteOne = async (req, res) => {
  const { GIVEN_API_KEY, id } = req.body;
  if (GIVEN_API_KEY == API_KEY) {
    try {
      const exists = await categorySchema.findOne({ category_id: id });

      // return res.json({ data: exists, id: id });
      if (exists || exists?.length == 0) {
        const categories = await categorySchema.findOneAndDelete({
          category_id: id,
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
      statuscode: 600,
      error: "WrongApi Key",
    });
  }
};

export const featuredOnHome = async (req, res) => {
  const { GIVEN_API_KEY } = req.body;
  if (GIVEN_API_KEY == API_KEY) {
    try {
      const categories = await categorySchema
        .findOne({
          category_status: true,
          category_showonhome: true,
        })
        .limit(1);
      const subCat = await subcategoriesSchema.find({
        category_id: categories._id,
      });

      return res.json({
        catName: categories.category_name,
        subCat: subCat,
        subCat_status: true,
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

export const newAddons = async (req, res) => {
  const { GIVEN_API_KEY, category_id } = req.body;
  if (API_KEY == GIVEN_API_KEY) {
    try {
      const data = await categorySchema
        .find({
          category_status: true,
        })
        .limit(4);

      return res.json({
        status: 200,
        data: data,
      });
    } catch (e) {
      res.json({ error: e });
    }
  } else {
    return res.json({ error: "Wrong Api Key", statuscode: 600 });
  }
};
