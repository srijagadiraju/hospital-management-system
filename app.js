// const express = require("express");
// import express from "express";
// import morgan from "morgan";
// import dotenv from "dotenv";
// import { errorHandler } from "./middleware/errorHandler";
// import contactRoute from "./routes/contactRoutes";

const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const path = require("path");
const requestRoute = require("./routes/requestRoutes");
const errorHandler = require("./middleware/errorHandler");
const loginRoute = require("./routes/loginRoutes");
const signUpRoute = require("./routes/signUpRoute");
// const mongoDB = require("../db/mongoDB");

console.log("1,2,3");
// const morgan = require("morgan");
// const errorHandler = require(`./middleware/errorHandler`);
// const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

const app = express();

// middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

const port = process.env.PORT || 3000;
// const contactRoute = require("./routes/contactRoutes");
app.use(express.static(path.join(__dirname, "public")));

app.use(express.json()); // provides parser to help parse data stream that is received from client on the server side
app.use(morgan("dev"));

app.use("/request", requestRoute); // middleware
app.use("/signup", signUpRoute);
app.use("/login", loginRoute);

app.use(errorHandler);
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
