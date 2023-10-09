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

import { MongoClient } from "mongodb";
import {
  getProfiles,
  createProfile,
  getProfile,
  updateProfile,
  deleteProfile,
} from "../controllers/contactController";

async function main() {
  const uri =
    "mongodb+srv://hlahtoo1998:project2123@cluster0.qfd7kqx.mongodb.net/?retryWrites=true&w=majority";
  const client = new MongoClient(uri);

  try {
    await client.connect();
    await createProfile(client, {
      name: "Hla Htoo",
      id: "13456",
      department: "Pathology",
      item: "Catheter",
    });
    //await listDatabases(client);
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}

main().catch(console.error);

async function getProfile(client, name) {
  const result = await client
    .db("Users")
    .collection("name")
    .insertOne(newProfile); //inserts a single document into the collection
}

async function createProfile(client, newProfile) {
  const result = await client
    .db("Users")
    .collection("name")
    .insertOne(newProfile); //inserts a single document into the collection
  console.log(
    `New Profile created with the following id: ${result.insertedId}`
  );
}

async function listDatabases(client) {
  const databasesList = await client.db().admin().listDatabases();

  console.log("Databases: ");
  databasesList.databases.forEach((db) => {
    console.log(`- ${db.name}`);
  });
}
