import express from "express";
import userSignUp from "../controllers/signUpController.js ";
// const express = require("express");
// const { userSignUp } = require("../controllers/signUpController");
const router = express.Router();

router.route("/").post(userSignUp);

export default router;
// module.exports = router;
