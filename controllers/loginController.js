// const mongoDB = require("../db/mongoDB");
import mongoDB from "../db/mongoDB.js";
// dotenv.config({ path: "./config.env" });

const userLogin = async (req, res) => {
  const inputUser = req.body;
  console.log("input reqbody", inputUser);
  console.log("input reqbody", req.header);
  if (await mongoDB.authenticateUsers(inputUser)) {
    res.status(200).json({
      status: "sucess",
      data: {
        inputUser,
      },
    });
  } else {
    return res.status(404).json({
      status: "fail",
      message: "Invalid ID",
    });
  }
};

export default userLogin;
