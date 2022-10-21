const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const colors = require("colors");
// const cookieParser = require("cookie-parser");
const errorHandler = require("./middleware/error");
const connectDB = require("./config/db");

//Load ENV variables
dotenv.config({ path: "./config/config.env" });

//Connect to database
connectDB();

//Routes files
const products = require("./routes/products");
const auth = require("./routes/auth");
const users = require("./routes/users");

const app = express();

//body parser
app.use(express.json());

// Cookie parser
// app.use(cookieParser);

//Logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//Mount Routers
app.use("/api/v1/products", products);
app.use("/api/v1/auth", auth);
app.use("/api/v1/users", users);

//Error Handling
app.use(errorHandler);

const PORT = process.env.PORT || 2022;
const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} on port ${PORT}`.yellow.bold
  )
);

// handle unhandled promise rejection
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  // Close server & exit process
  server.close(() => process.exit(1));
});
