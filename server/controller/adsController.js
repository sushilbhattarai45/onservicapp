import moment from "moment";
import {} from "dotenv/config";
import adsSchema from "../model/adsSchema.js";
const API_KEY = process.env.API_KEY;
import PDFDocument from "pdfkit";
import fs from "fs";
export const postAds = async (req, res) => {
  const {
    GIVEN_API_KEY,
    ads_name,
    ads_givenEmail,
    ads_link,
    ads_location,
    ads_mediaLink,
    ads_tag,
    ads_type,
    ads_status,
    ads_updatedBy,
  } = req.body;
  if (GIVEN_API_KEY == API_KEY) {
    const ads_toc = {
      date: moment().format("ll"),
      time: moment().format("LT"),
    };
    try {
      // const doc = new PDFDocument();

      // // Saving the pdf file in root directory.
      // doc.pipe(fs.createWriteStream("./pdf/" + Date.now() + ".pdf"));

      // // Adding functionality
      // doc.fontSize(20)
      //   .text(
      //     "This the Printed copy of the Form of OnServic Service Provider",
      //     100,
      //     100
      //   );

      // doc.image("a1.jpg", {
      //   fit: [300, 300],
      //   align: "center",
      //   valign: "center",
      // });

      // Adding an image in the pdf.

      // doc  
      //   .addPage()
      //   .fontSize(15)
      //   .text("Generating PDF with the help of pdfkit", 100, 100);

      // Apply some transforms and render an SVG path with the
      // 'even-odd' fill rule
      // doc
      //   .scale(0.6)
      //   .translate(470, -380)
      //   .path("M 250,75 L 323,301 131,161 369,161 177,301 z")
      //   .fill("red", "even-odd")
      //   .restore();

      // Add some text with annotations
      // doc
      //   .addPage()
      //   .fillColor("blue")
      //   .text("The link for GeeksforGeeks website", 100, 100)

      //   .link(100, 100, 160, 27, "https://www.geeksforgeeks.org/");

      // Finalize PDF file
      // doc.end();
      const ads = new adsSchema({
        ads_toc,
        ads_name,
        ads_link,
        ads_tag,
        ads_givenEmail,
        ads_mediaLink,
        ads_updatedBy,
        ads_status,
        ads_type,
        ads_location,
      });
      console.log("ok" + ads);
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
    ads_mediaLink,
    ads_name,
    ads_givenEmail,
    ads_updatedBy,
    ads_status,
    ads_tag,
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
          ads_mediaLink: ads_mediaLink,
          ads_name: ads_name,
          ads_status: ads_status,
          ads_location: ads_location,
          ads_type: ads_type,
          ads_updatedBy: ads_updatedBy,
          ads_givenEmail: ads_givenEmail,
          ads_link: ads_link,
          ads_tag: ads_tag,
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
        ads_location: "HOMETOP",
      });

      const homebottomimages = await adsSchema.find({
        ads_status: "true",
        ads_type: "IMAGE",
        ads_location: "HOMEBOTTOM",
      });
      const homeVideo = await adsSchema.find({
        ads_status: "true",
        ads_type: "VIDEO",
        ads_location: "HOMEVIDEO",
      });
      const bookmark = await adsSchema.find({
        ads_status: "true",
        ads_type: "IMAGE",
        ads_location: "BMAD",
      });

      return res.json({
        hometop: hometopimages,
        homebottom: homebottomimages,
        homevideo: homeVideo,
        bookmarkimage: bookmark,
        message: "Done",
        statuscode: 201,
      });
    } catch (e) {
      return res.json({ error: " Server side error" });
    }
  } else {
    return res.json({ statuscode: 700, error: "Wrong Api Key" });
  }
};

export const getCatAds = async (req, res) => {
  const { GIVEN_API_KEY, ads_tag } = req.body;
  if (GIVEN_API_KEY == API_KEY) {
    try {
      console.log(ads_tag);
      const catads = await adsSchema.find({
        ads_status: "true",
        ads_type: "IMAGE",
        ads_location: "CATAD",
        ads_tag: ads_tag,
      });

      return res.json({
        catads: catads,

        message: "Done",
        statuscode: 201,
      });
    } catch (e) {
      return res.json({ error: " Server side error" });
    }
  } else {
    return res.json({ statuscode: 700, error: "Wrong Api Key" });
  }
};
export const getAllADS = async (req, res) => {
  const { GIVEN_API_KEY } = req.body;
  if (API_KEY == GIVEN_API_KEY) {
    try {
      const allAds = await adsSchema.find();
      return res.json({ data: allAds });
    } catch (e) {
      return res.json({ error: e });
    }
  } else {
    return res.json({ error: "Wrong Api Key", statuscode: 700 });
  }
};
