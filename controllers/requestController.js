import asyncHandler from "express-async-handler";
import mongoDB from "../db/mongoDB.js";

export const getRequestsCon = asyncHandler(async (req, res) => {
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
    return res.status(304).json({
      status: "fail",
      message: "Requests are not available",
    });
  }
});

export const createRequest = asyncHandler(async (req, res) => {
  const inputreq = req.body;
  if (await mongoDB.insertRequest(inputreq)) {
    res.status(201).json({
      status: "sucess",
      data: {
        inputreq,
      },
    });
  } else {
    return res.status(304).json({
      status: "fail",
      message: "More information required to create a request",
    });
  }
});

export const updateRequest = asyncHandler(async (req, res) => {
  const inputreq = req.body;
  console.log("this is from requestController", inputreq);
  console.log("Hello!1", await mongoDB.updateRequest(inputreq));
  if (await mongoDB.updateRequest(inputreq)) {
    res.status(200).json({
      status: "success",
      data: {
        inputreq,
      },
    });
  } else {
    return res.status(304).json({
      status: "fail",
      message: "Failed to update the request",
    });
  }
});

export const deleteRequestCon = asyncHandler(async (req, res) => {
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
    return res.status(304).json({
      status: "fail",
      message: "More information required to delete a request",
    });
  }
});
