import express from "express";
import userSignUp from "../controllers/signUpController.js ";

const router = express.Router();

router.route("/").post(userSignUp);

export default router;
