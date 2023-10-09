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
import fs from "fs";
// import {
//   getProfiles,
//   createProfile,
//   getProfile,
//   updateProfile,
//   deleteProfile,
// } from "../controllers/contactController";

async function getProfile(client, name) {
  const result = await client
    .db("Users")
    .collection("Users-info")
    .insertOne(newProfile); //inserts a single document into the collection
}

async function createProfile(client, newProfile) {
  const result = await client
    .db("Users")
    .collection("Users-info")
    .insertOne(newProfile); //inserts a single document into the collection
  console.log(
    `New Profile created with the following id: ${result.insertedId}`
  );
}

// async function updateProfile(client, name, updatedProfile){
//   const result = await client
//     .db("Users")
//     .collection("Users-info")
//     .updateOne(newProfile);
//   // $set operator replaces the value of a field with the specified value
//   console.log(`${result.matchedCount} document(s) matched the criteria`);

// }

async function createMultipleProfile(client, newProfiles) {
  const result = await client
    .db("Users")
    .collection("users-info")
    .insertMany(newProfiles);

  console.log(
    `${result.insertedCount} new profiles created with the following ids`
  );
  console.log(result.insertedIds);
}

async function listDatabases(client) {
  const databasesList = await client.db().admin().listDatabases();

  console.log("Databases: ");
  databasesList.databases.forEach((db) => {
    console.log(`- ${db.name}`);
  });
}

const uri =
  "mongodb+srv://hlahtoo1998:28H1JDxdnJqipwwL@cluster0.qfd7kqx.mongodb.net/?retryWrites=true&w=majority";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri);

async function main() {
  try {
    await client.connect();
    await listDatabases(client);

    await fs.readFile("../data/requests.json", "utf8", (err, data) => {
      if (err) {
        console.error("Error reading file:", err);
        return;
      }

      // Parse the JSON data into an array of objects
      try {
        const arrayOfObjects = JSON.parse(data);
        createMultipleProfile(client, arrayOfObjects);
      } catch (parseError) {
        console.error("Error parsing JSON:", parseError);
      }
    });
    // console.log(arrayOfObjects);
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