// const express = require("express");
// import express from "express";
// import morgan from "morgan";
// import dotenv from "dotenv";
// import { errorHandler } from "./middleware/errorHandler";
// import contactRoute from "./routes/contactRoutes";

const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const contactRoute = require("./routes/contactRoutes");
const errorHandler = require("./middleware/errorHandler");

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

app.use(express.json()); // provides parser to help parse data stream that is received from client on the server side
app.use("/api/contacts", contactRoute); // middleware
app.use(errorHandler);
app.use(morgan("dev"));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
