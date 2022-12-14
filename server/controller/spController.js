import spSchema from "../model/spSchema.js";
import {} from "dotenv/config";
import moment from "moment";
import subCatSchema from "../model/subCatSchema.js";
import employeeSchema from "../model/employeSchema.js";
const API_KEY = process.env.API_KEY;
export const test = async (req, res) => {
  res.send("okkk");
};

export const postSp = async (req, res) => {
  const {
    GIVEN_API_KEY,
    sp_name,
    user_id,
    sp_whatsapp,
    sp_email,
    sp_contact,
    sp_district,
    sp_officeNumber,
    sp_skills,
    sp_city,
    sp_street,
    sp_createdBy,
    sp_gender,
    sp_password,
    sp_updatedBy,
    sp_location,
    sp_platform,
    sp_paid,
    sp_status,
    employee_contact,
    sp_profileImage,
    sp_media,
  } = req.body;

  if (GIVEN_API_KEY == API_KEY) {
    try {
      const timeanddate = {
        date: moment().format("ll"),
        time: moment().format("LT"),
      };
      const sp_billid = Date.now();
      const exists = await spSchema.findOne({ sp_contact: sp_contact });
      if (!exists || exists?.length == 0) {
        console.log(sp_whatsapp);
        const sp = new spSchema({
          sp_status: sp_status,
          sp_name: sp_name,
          user_id: user_id,
          sp_billid: sp_billid,
          sp_email: sp_email,
          sp_contact: sp_contact,
          sp_district: sp_district,
          sp_officeNumber: sp_officeNumber,
          sp_skills: sp_skills,
          sp_city: sp_city,
          sp_street: sp_street,
          sp_createdBy: sp_createdBy,
          sp_gender: sp_gender,
          sp_paid: sp_paid,
          sp_location: sp_location,
          sp_whatsapp: sp_whatsapp,
          employee_contact: employee_contact,
          sp_toc: timeanddate,
          sp_profileImage: sp_profileImage,
          sp_media: sp_media,
          sp_updatedBy: sp_updatedBy,
        });

        if (sp_platform == "APP") {
          const spData = await sp.save();
          return res.json({ statuscode: 201, sp: spData });
        } else if (sp_platform == "WEB") {
          const employeedata = await employeeSchema.findOne({
            employee_contact: employee_contact,
          });
          const dblimit = employeedata?.employee_limit;
          const limit = employeedata?.employee_limit - 1;
          if (dblimit > 0) {
            const updatedemployee = await employeeSchema.findOneAndUpdate(
              {
                employee_contact: employee_contact,
              },
              {
                employee_limit: limit,
              }
            );
            const spData = await sp.save();
            return res.json({ statuscode: 201, sp: spData });
          } else {
            return res.status(500).json({
              statusCode: 500,
              error: "No Limit available.",
            });
          }
        } else {
          return res.status(400).json({
            error: "Sorry Platform Not Supported",
          });
        }
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
export const updateSp = async (req, res) => {
  const {
    GIVEN_API_KEY,
    sp_name,
    user_id,
    sp_email,
    sp_contact,
    sp_whatsapp,
    sp_district,
    sp_officenumber,
    sp_skills,
    sp_paid,
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
        return res.json({
          statuscode: 600,
          message: "sp Doesnot exists",
        });
      } else {
        const sp = await spSchema.findOneAndUpdate(
          { sp_contact: sp_contact },
          req.body
        );
        const updatedData = await spSchema.find({ sp_contact: sp_contact });
        return res.json({ statuscode: 201, sp: updatedData });
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
      if (spdata) {
        return res.json({ statuscode: 201, data: spdata, message: "True" });
      } else return res.json({ statuscode: 400, message: "False" });
    } catch (e) {
      return res.json({
        error: "Sry there is some error in our side",
      });
    }
  } else {
    return res.json({ statuscode: 700, message: "Wrong Api Key" });
  }
};

export const getCatSp = async (req, res) => {
  console.log("ok");
  const { GIVEN_API_KEY, city, district, skill } = req.body;
  if (GIVEN_API_KEY == API_KEY) {
    try {
      console.log(city);
      if (city && city !== "") {
        const spdata = await spSchema.find({
          sp_skills: skill,
          sp_city: city,
          sp_status: "ACTIVE",
        });
        const spddata = await spSchema
          .find({
            sp_skills: skill,
            sp_district: district,
            sp_status: "ACTIVE",
          })
          .sort({ _id: -1 });

        if (spdata.length != 0) {
          return res.json({ statuscode: 201, data: spdata });
        } else if (spddata.length != 0) {
          return res.json({ statuscode: 201, data: spddata });
        } else {
          const spnationdata = await spSchema.find({
            sp_skills: skill,
            sp_status: "ACTIVE",
          });
          return res.json({ statuscode: 201, data: spnationdata });
        }
      } else {
        const spdata = await spSchema.find({
          sp_skills: skill,
          sp_status: "ACTIVE",
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

export const getSearchedSp = async (req, res) => {
  const { GIVEN_API_KEY, city, skill } = req.body;
  if (GIVEN_API_KEY == API_KEY) {
    try {
      console.log(city);
      if (city && city !== "") {
        const spdata = await spSchema
          .find({
            sp_skills: skill,
            sp_district: city,
            sp_status: "ACTIVE",
          })
          .sort({ _id: -1 });
        console.log(spdata);

        return res.json({ statuscode: 201, data: spdata });
      } else {
        const spdata = await spSchema.find({
          sp_skills: skill,
          sp_status: "ACTIVE",
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

export const getFilteredSubCat = async (req, res) => {
  const { GIVEN_API_KEY, city, district } = req.body;
  if (GIVEN_API_KEY == API_KEY) {
    try {
      let subcatid = [];
      let subcatdetails = [];

      if (city && city !== "") {
        const spdata = await spSchema.find({
          sp_city: city,
          sp_status: "ACTIVE",
        });

        const spddata = await spSchema.find({
          sp_district: district,
          sp_status: "ACTIVE",
        });
        const spnation = await spSchema.find({
          sp_status: "ACTIVE",
        });
        console.log(spdata);
        let count = 0;
        if (spdata.length != 0) {
          spdata.map((item) => {
            item.sp_skills.map((skill) => {
              if (!subcatid.includes(skill)) {
                subcatid.push(skill);
              }
            });
          });

          subcatdetails = await Promise.all(
            subcatid.map(async (item) => {
              const subcat = await subCatSchema.find({
                subCat_name: item,
              });
              console.log(subcat[0]);
              return subcat[0];
            })
          );

          return res.json({
            statuscode: 201,
            data: subcatid,
            subcat: subcatdetails,
          });
        } else if (spddata != 0) {
          spddata.map((item) => {
            item.sp_skills.map((skill) => {
              if (!subcatid.includes(skill)) {
                subcatid.push(skill);
              }
            });
          });

          subcatdetails = await Promise.all(
            subcatid.map(async (item) => {
              const subcat = await subCatSchema.find({
                subCat_name: item,
              });
              console.log(subcat[0]);
              return subcat[0];
            })
          );

          return res.json({
            statuscode: 201,
            data: subcatid,
            subcat: subcatdetails,
          });
        } else {
          spnation.map((item) => {
            item.sp_skills.map((skill) => {
              if (!subcatid.includes(skill)) {
                subcatid.push(skill);
              }
            });
          });

          subcatdetails = await Promise.all(
            subcatid.map(async (item) => {
              const subcat = await subCatSchema.find({
                subCat_name: item,
              });
              console.log(subcat[0]);
              return subcat[0];
            })
          );

          return res.json({
            statuscode: 201,
            spnation: "ok",

            data: subcatid,
            subcat: subcatdetails,
          });
        }
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

export const updateSettings = async (req, res) => {
  const { GIVEN_API_KEY, sp_contact, sp_status, sp_showReview } = req.body;
  if (GIVEN_API_KEY == API_KEY) {
    try {
      const updateSettings = await spSchema.findOneAndUpdate(
        {
          sp_contact: sp_contact,
        },
        {
          sp_status: sp_status,
          sp_showReview: sp_showReview,
        }
      );
      console.log(sp_showReview, sp_status, sp_contact);
      // const newData = await spSchema.find({ sp_contact: sp_contact });
      return res.json({
        statuscode: 200,
        message: "sucessfully Updated the data",
        // data: newData,
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

export const deleteSp = async (req, res) => {
  const { GIVEN_API_KEY, sp_contact } = req.body;
  if (GIVEN_API_KEY == API_KEY) {
    try {
      const exists = await spSchema.findOne({ sp_contact: sp_contact });

      // return res.json({ data: exists, id: id });
      if (exists || exists?.length == 0) {
        const sp = await spSchema.findOneAndDelete({
          sp_contact: sp_contact,
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
export const getEmployeeCreatedSp = async (req, res) => {
  const { GIVEN_API_KEY, employee_contact } = req.body;
  console.log("apiKEy", GIVEN_API_KEY);
  if (GIVEN_API_KEY == API_KEY) {
    try {
      const data = await spSchema.find({
        employee_contact: employee_contact,
      });
      return res.json({ statuscode: 201, data: data });
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
export const getMoreskilledSp = async (req, res) => {
  const { GIVEN_API_KEY, employee_contact } = req.body;
  console.log("apiKEy", GIVEN_API_KEY);
  if (GIVEN_API_KEY == API_KEY) {
    try {
      const data = await spSchema.find();
      const finaldata = [];
      data.map((item) => {
        if (item.sp_skills.length > 1) {
          finaldata.push(item);
        }
      });

      return res.json({ statuscode: 201, data: finaldata });
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
export const getimedSp = async (req, res) => {
  const { GIVEN_API_KEY, creationdate } = req.body;
  console.log("apiKEy", GIVEN_API_KEY);
  if (GIVEN_API_KEY == API_KEY) {
    try {
      const data = await spSchema.find();
      const finaldata = [];
      data.map((item) => {
        if (item.sp_toc.date == creationdate) {
          finaldata.push(item);
        }
      });

      return res.json({ statuscode: 201, data: finaldata });
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
