import mongoose from "mongoose";
import ip from "ip"
import os from "os";
export const connectDB = async (req,res) => {
  try {
var networkInterfaces = os.networkInterfaces();
console.dir ( networkInterfaces );

    const url = process.env.MONGO_URL;
    const conn = await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`Database connected : ${conn.connection.host}`);
  } catch (error) {
    console.log("Database error: " + error);
  }
};
