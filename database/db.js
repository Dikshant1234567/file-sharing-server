import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config()

const Mongodb_url = process.env.MongoDbConnection

const DatabaseConnection = async () => {
  try {
    await mongoose.connect(Mongodb_url, {
      useNewUrlParser: true,
    });

    console.log(`connected to mongodb sucessfully...`);
  } catch (error) {
    console.log("Error while connecting with the databse", error);
  }
};
export default DatabaseConnection;
