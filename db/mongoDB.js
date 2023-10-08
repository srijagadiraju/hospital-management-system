// const { MongoClient, ObjectId } = require("mongodb");
// require("dotenv").config();

// function HospitalDB() {
//   const hospitalDB = {};
//   const url = process.env.DB_URL || "mongodb://localhost:27017";
//   const DB_NAME = "hospital-management-db";

//   async function connectToDatabase() {
//     const client = new MongoClient(url, { useUnifiedTopology: true });
//     await client.connect();
//     return client;
//   }

//   hospitalDB.read = async (collectionName, query) => {
//     const client = await connectToDatabase();
//     try {
//       const db = client.db(DB_NAME);
//       const collection = db.collection(collectionName);
//       const result = await collection.find(query).toArray();
//       return result;
//     } finally {
//       client.close();
//     }
//   };

//   hospitalDB.create = async (collectionName, data) => {
//     const client = await connectToDatabase();
//     try {
//       const db = client.db(DB_NAME);
//       const collection = db.collection(collectionName);
//       const result = await collection.insertOne(data);
//       return result.insertedId;
//     } finally {
//       client.close();
//     }
//   };

//   hospitalDB.update = async (collectionName, query, updateData) => {
//     const client = await connectToDatabase();
//     try {
//       const db = client.db(DB_NAME);
//       const collection = db.collection(collectionName);
//       await collection.updateOne(query, { $set: updateData });
//       return "success";
//     } finally {
//       client.close();
//     }
//   };

//   hospitalDB.delete = async (collectionName, query) => {
//     const client = await connectToDatabase();
//     try {
//       const db = client.db(DB_NAME);
//       const collection = db.collection(collectionName);
//       await collection.deleteOne(query);
//       return "success";
//     } finally {
//       client.close();
//     }
//   };

//   return hospitalDB;
// }

// module.exports = HospitalDB();


const { MongoClient } = require("mongodb");
const dotenv = require("dotenv").config();

const url = process.env.DB_URL || "mongodb://localhost:27017";
const DB_NAME = "hospital-management-db"; // REPLACE WITH DATABASE NAME!
const client = new MongoClient(url, { useUnifiedTopology: true });

async function connectToDatabase() {
  await client.connect();
  console.log("Connected to the database!");
  return client.db(DB_NAME);
}

module.exports = { connectToDatabase };
