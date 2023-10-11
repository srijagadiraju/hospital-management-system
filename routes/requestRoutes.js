import express from "express";
import {
  getRequestsCon,
  createRequest,
  deleteRequestCon,
  updateRequest,
} from "../controllers/requestController.js";
// const express = require("express");
// const { updateRequest } = require("../db/mongoDB");

// const {
//   getRequestsCon,
//   createRequest,
//   deleteRequestCon,
//   updateRequest,
// } = require("../controllers/requestController");

const router = express.Router();
router
  .route("/")
  .get(getRequestsCon)
  .post(createRequest)
  .put(updateRequest)
  .delete(deleteRequestCon);

// router.route("/:id").get(getProfile).patch(updateProfile).delete(deleteProfile);

export default router;
