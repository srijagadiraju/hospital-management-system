const express = require("express");
const router = express.Router();
const {
  getRequestsCon,
  createRequest,
  deleteRequestCon,
} = require("../controllers/requestController");

router
  .route("/")
  .get(getRequestsCon)
  .post(createRequest)
  .delete(deleteRequestCon);

// router.route("/:id").get(getProfile).patch(updateProfile).delete(deleteProfile);

module.exports = router;
