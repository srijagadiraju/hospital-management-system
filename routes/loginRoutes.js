// const express = require("express");
import express from "express";
import userLogin from "../controllers/loginController.js";
// const { userLogin } = require("../controllers/loginController");
const router = express.Router();

router.route("/").post(userLogin);

export default router;
