const express = require("express");

const { userSignUp } = require("../controllers/signUpController");
const router = express.Router();

router.route("/").post(userSignUp);

module.exports = router;
