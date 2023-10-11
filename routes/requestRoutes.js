import express from "express";
import {
  getRequestsCon,
  createRequest,
  deleteRequestCon,
  updateRequest,
} from "../controllers/requestController.js";

const router = express.Router();
router
  .route("/")
  .get(getRequestsCon)
  .post(createRequest)
  .put(updateRequest)
  .delete(deleteRequestCon);

export default router;
