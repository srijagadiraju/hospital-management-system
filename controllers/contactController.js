import asyncHandler from "express-async-handler";

// @desc Get All Profiles
// @route GET /api/contacts
// @access public

export const getProfiles = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Get All Profiles" });
});

// @desc Create New Profile
// @route POST /api/contacts
// @access public
export const createProfile = asyncHandler(async (req, res) => {
  console.log("The request body is:", req.body);
  const { name, id, department, item } = req.body;
  if (!name || !id || !department || !item) {
    res.status(400);
    throw new Error("Please fill out all fields to submit your request.");
  }
  res.status(201).json({ message: "Create Profile" });
});

// @desc Get Profile
// @route GET /api/contacts/:id
// @access public
export const getProfile = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Get Profile For ${req.params.id}` });
});

// @desc Update Profile
// @route PUT /api/contacts/:id
// @access public
export const updateProfile = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Update Profile For ${req.params.id}` });
});

// @desc Delete Profile
// @route DELETE /api/contacts/:id
// @access public
export const deleteProfile = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Delete Profile For ${req.params.id}` });
});

// module.exports = {
//   getProfiles,
//   createProfile,
//   getProfile,
//   updateProfile,
//   deleteProfile,
// };