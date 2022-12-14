import moment from "moment";
import {} from "dotenv/config";
import adsSchema from "../model/adsSchema.js";
import employeeSchema from "../model/employeSchema.js";
const API_KEY = process.env.API_KEY;
import fetch from "node-fetch";
const SMS_TOKEN = process.env.SMS_TOKEN;
const getSms = async (otp, num) => {
  var url = "https://sms.aakashsms.com/sms/v3/send/";
  var data = {
    to: num,
    auth_token: SMS_TOKEN,

    text: " Hello User Your code is: " + otp + " Regards OnServic",
  };
  fetch(url, {
    method: "POST",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify(data),
  }).catch((error) => {
    console.log("Error" + error);
  });
};

export const postEmployee = async (req, res) => {
  const {
    GIVEN_API_KEY,
    employee_name,
    employee_contact,
    employee_status,
    employee_limit,
    employee_post,
  } = req.body;

  try {
    if (GIVEN_API_KEY == API_KEY) {
      const exists = await employeeSchema.findOne({
        employee_contact: employee_contact,
      });
      if (!exists || exists?.length == 0) {
        const employee_doc = {
          date: moment().format("ll"),
          time: moment().format("LT"),
        };
        const employee = new employeeSchema({
          employee_name: employee_name,
          employee_contact: employee_contact,
          employee_status: employee_status,
          employee_limit: employee_limit,
          employee_post: employee_post,
          employee_doc: employee_doc,
        });
        const employeeData = await employee.save();
        return res.json({ statuscode: 201, employee: employeeData });
      } else {
        return res.json({
          statuscode: 600,
          message: "Employee already exists",
        });
      }
    } else {
      return res.json({
        statuscode: 700,
        message: "Wrong Api Key",
      });
    }
  } catch (e) {
    console.log(e);
    return res.status(400).json({
      error: "Sry there is some error in our side",
    });
  }
};

export const updateEmployee = async (req, res) => {
  const {
    GIVEN_API_KEY,
    employee_name,
    employee_contact,
    employee_status,
    employee_limit,
    employee_post,
  } = req.body;
  if (API_KEY == GIVEN_API_KEY) {
    try {
      const exists = await employeeSchema.findOne({
        employee_contact: employee_contact,
      });
      const dblimit = exists?.employee_totallimit;
      console.log(employee_limit)
      console.log(dblimit)
    
      const limitrem = exists?.employee_limit;
      const limitfinal = limitrem + employee_limit;
      const totallimit = dblimit + employee_limit;
      if (exists || exists?.length == 0) {
        const update = await employeeSchema.findOneAndUpdate(
          { employee_contact: employee_contact },
          {
            employee_name: employee_name,
            employee_contact: employee_contact,
            employee_status: employee_status,
            employee_limit: limitfinal,
            employee_totallimit:totallimit,
            employee_post: employee_post,
          }
        );
        const updateddata = await employeeSchema.findOne({
          employee_contact: employee_contact,
        });
        return res.json({ "stauscode:": 200, data: updateddata });
      } else {
        return res.json({
          error: "No data found for the given Employee",
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
export const deleteAllEmployee = async (req, res) => {
  const { GIVEN_API_KEY } = req.body;
  if (GIVEN_API_KEY == API_KEY) {
    try {
      const data = await employeeSchema.remove();
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

export const getAllEmployee = async (req, res) => {
  const { GIVEN_API_KEY } = req.body;
  if (API_KEY == GIVEN_API_KEY) {
    try {
      const allEmployee = await employeeSchema.find().sort({ _id: -1 });
      return res.json({ data: allEmployee });
    } catch (e) {
      return res.json({ error: e });
    }
  } else {
    return res.json({ error: "Wrong Api Key", statuscode: 700 });
  }
};

export const getOneEmployee = async (req, res) => {
  const { GIVEN_API_KEY, employee_contact } = req.body;
  if (API_KEY == GIVEN_API_KEY) {
    try {
      const getUser = await employeeSchema.findOne({
        employee_contact: employee_contact,
      });

      if (getUser) {
        return res.json({
          message: "Employee found",
          statuscode: 201,
          data: getUser,
        });
      } else {
        return res.json({ message: "Employee not found", statuscode: 400 });
      }
    } catch (e) {
      return res.json({ error: e });
    }
  } else {
    return res.json({ error: "Wrong Api Key", statuscode: 700 });
  }
};

export const deleteOne = async (req, res) => {
  const { GIVEN_API_KEY, employee_contact } = req.body;
  if (GIVEN_API_KEY == API_KEY) {
    try {
      const data = await employeeSchema.deleteOne({
        employee_contact: employee_contact,
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

export const login = async (req, res) => {
  const { employee_contact, GIVEN_API_KEY } = req.body;
  if (API_KEY == GIVEN_API_KEY) {
    try {
      const loginUser = await employeeSchema.findOne({
        employee_contact: employee_contact,
      });
      if (loginUser) {
        if (loginUser?.employee_status == true) {
          let genOtp = Math.floor(100000 + Math.random() * 900000);
          getSms(genOtp, employee_contact);
          return res.json({
            statuscode: 201,
            otp: genOtp,
            message: "User Exists",
            data: loginUser,
          });
        } else {
          return res.json({
            statuscode: 800,
            message: "Account INACTIVE.",
          });
        }
      } else {
        return res.json({
          statuscode: 404,
          message: "user  not  exists",
        });
      }
    } catch (error) {
      return res.status(500).send(error);
    }
  } else {
    return res.json({ error: "Error! Wrong Api Key", statuscode: 700 });
  }
};
