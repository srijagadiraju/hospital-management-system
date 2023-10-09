// const express = require("express");
import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import errorHandler from "./middleware/errorHandler";

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
const contactRoute = require("./routes/contactRoutes");

app.use(express.json()); // provides parser to help parse data stream that is received from client on the server side
app.use("/api/contacts", contactRoute); // middleware
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// const express = require("express");
// const dotenv = require("dotenv").config();
// const errorHandler = require("./middleware/errorHandler");
// const HospitalDB = require("./HospitalDB"); // Replace with the correct path to your MongoDB utility module

// const app = express();
// const port = process.env.PORT || 5000;

// app.use(express.json()); // Middleware for parsing JSON requests

// // Define routes
// const hospitalRoutes = require("./routes/hospitalRoutes"); // Import hospital routes
// const patientRoutes = require("./routes/patientRoutes"); // Import patient routes

// // Use routes
// app.use("/api/hospitals", hospitalRoutes);
// app.use("/api/patients", patientRoutes);

// // Error handling middleware
// app.use(errorHandler);

// // Start the server
// app.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });

// // Database connection (if you're not using Mongoose)
// const db = HospitalDB();

// // Test database connection (optional)
// db.read("hospitals", {})
//   .then((result) => {
//     console.log("Database connection established");
//   })
//   .catch((error) => {
//     console.error("Error connecting to the database:", error);
//   });