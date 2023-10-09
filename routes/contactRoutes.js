const express = require("express");
const router = express.Router();
const {
  getProfiles,
  createProfile,
  getProfile,
  updateProfile,
  deleteProfile,
} = require("../controllers/contactController");

router.route("/").get(getProfiles).post(createProfile);

router.route("/:id").get(getProfile).patch(updateProfile).delete(deleteProfile);

module.exports = router;
