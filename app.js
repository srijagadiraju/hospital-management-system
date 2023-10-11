import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import errorHandler from "./middleware/errorHandler.js";
import requestRoute from "./routes/requestRoutes.js";
import loginRoute from "./routes/loginRoutes.js";
import signUpRoute from "./routes/signUpRoute.js";

dotenv.config({ path: "./config.env" });

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

const port = process.env.PORT || 3000;

app.use(express.static("public"));
app.use(express.json()); // provides parser to help parse data stream that is received from client on the server side
app.use(morgan("dev"));

app.use("/request", requestRoute); // middleware
app.use("/signup", signUpRoute);
app.use("/login", loginRoute);

app.use(errorHandler);
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
