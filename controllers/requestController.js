const asyncHandler = require("express-async-handler");
const mongoDB = require("../db/mongoDB");

// @desc Get All Profiles
// @route GET /api/contacts
// @access public

exports.getRequestsCon = asyncHandler(async (req, res) => {
  console.log("hello");
  try {
    mongoDB.getAllRequests().then((requests) => {
      res.status(200).json({
        status: "success",
        results: requests.length,
        data: {
          requests,
        },
      });
    });
  } catch (err) {
    console.log(err.message);
    return res.status(404).json({
      status: "fail",
      message: "Requests are not available",
    });
  }
});

exports.createRequest = asyncHandler(async (req, res) => {
  const inputreq = req.body;
  if (await mongoDB.insertRequest(inputreq)) {
    res.status(201).json({
      status: "sucess",
      data: {
        inputreq,
      },
    });
  } else {
    return res.status(404).json({
      status: "fail",
      message: "More information required to create a request",
    });
  }
});

exports.deleteRequestCon = asyncHandler(async (req, res) => {
  const inputreq = req.body;
  if (await mongoDB.deleteRequest(inputreq)) {
    res.status(204).json({
      status: "sucess",
      message: "Request successfully deleted",
      data: {
        inputreq,
      },
    });
  } else {
    return res.status(404).json({
      status: "fail",
      message: "More information required to delete a request",
    });
  }
});

// // @desc Create New Profile
// // @route POST /api/contacts
// // @access public
// const createProfile = asyncHandler(async (req, res) => {
//   console.log("The request body is:", req.body);
//   const { name, id, department, item } = req.body;
//   if (!name || !id || !department || !item) {
//     res.status(400);
//     throw new Error("Please fill out all fields to submit your request.");
//   }
//   res.status(201).json({ message: "Create Profile" });
// });

// // @desc Get Profile
// // @route GET /api/contacts/:id
// // @access public
// const getProfile = asyncHandler(async (req, res) => {
//   res.status(200).json({ message: `Get Profile For ${req.params.id}` });
// });

// // @desc Update Profile
// // @route PUT /api/contacts/:id
// // @access public
// const updateProfile = asyncHandler(async (req, res) => {
//   res.status(200).json({ message: `Update Profile For ${req.params.id}` });
// });

// // @desc Delete Profile
// // @route DELETE /api/contacts/:id
// // @access public
// const deleteProfile = asyncHandler(async (req, res) => {
//   res.status(200).json({ message: `Delete Profile For ${req.params.id}` });
// });

// module.exports = {
//   getProfiles,
//   createProfile,
//   getProfile,
//   updateProfile,
//   deleteProfile,
// };
