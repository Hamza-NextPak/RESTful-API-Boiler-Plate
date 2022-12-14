const mongoose = require("mongoose");
const connectDB = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URI, {});

  console.log(
    `Mongo Database Connected: ${conn.connection.host}`.underline.bold.cyan
  );
};

module.exports = connectDB;
