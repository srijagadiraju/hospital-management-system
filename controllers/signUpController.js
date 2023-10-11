import mongoDB from "../db/mongoDB.js";

const userSignUp = async (req, res) => {
  const inputUser = req.body;
  if (await mongoDB.insertNewUser(inputUser)) {
    res.status(201).json({
      status: "success",
      data: {
        inputUser,
      },
    });
  } else {
    return res.status(404).json({
      status: "fail",
      message: "More information required to complete sign up",
    });
  }
};

export default userSignUp;
