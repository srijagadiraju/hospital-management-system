import { MongoClient } from "mongodb";
import bcrypt from "bcrypt";
import "dotenv/config";

function MongoDBUtil() {
  const myDB = {};
  const password = process.env.DATABASE_PASSWORD;

  const uri = process.env.DATABASE.replace(
    "<PASSWORD>",
    process.env.DATABASE_PASSWORD
  );

  const database = "Users";
  const colRequests = "Requests";
  const colAuthen = "Users-Login";

  //-------------------------------------------------------
  // listing databases
  myDB.listDatabases = async () => {
    const databasesList = await client.db().admin().listDatabases();
    let client;
    try {
      client = new MongoClient(uri);
      await client.connect();

      databasesList.databases.forEach((db) => {
        console.log(`- ${db.name}`);
      });
    } finally {
      client.close();
    }
  };

  // -----------------------------------------------------
  // creating Request or User-Login
  myDB.insertRequest = async (newRequest) => {
    let client;
    try {
      client = new MongoClient(uri);
      await client.connect();
      console.log("connected to MongoDB");
      const result = await client
        .db(database)
        .collection(colRequests)
        .insertOne({
          name: newRequest.name,
          id: newRequest.id,
          department: newRequest.department,
          item: newRequest.item,
        }); //inserts a single document into the collection
      console.log(
        `New Profile created with the following id: ${result.insertedId}`
      );
      return true;
    } finally {
      client.close();
    }
  };

  // -----------------------------------------------------
  // creating User-Login
  myDB.insertNewUser = async (newUser) => {
    let client;
    try {
      client = new MongoClient(uri);
      await client.connect();
      console.log("connected to MongoDB");
      const hashedPassword = await bcrypt.hash(newUser.password, 10);
      const result = await client.db(database).collection(colAuthen).insertOne({
        email: newUser.email,
        password: hashedPassword,
      }); //inserts a single document into the collection
      console.log(
        `New Profile created with the following id: ${result.insertedId}`
      );
      return true;
    } catch (error) {
      console.error("Sign up error:", error.message);
      return false;
    } finally {
      client.close();
    }
  };

  // creating multiple profile
  myDB.createMultipleProfile = async (newProfiles) => {
    let client;
    try {
      client = new MongoClient(uri);
      await client.connect();
      console.log("connected to MongoDB");
      const result = await client
        .db(database)
        .collection(colRequests)
        .insertMany(newProfiles);

      console.log(
        `${result.insertedCount} new profiles created with the following ids`
      );
      console.log(result.insertedIds);
    } finally {
      client.close();
    }
  };

  // Authenticating Login
  myDB.authenticateUsers = async (inputData) => {
    let client;
    try {
      client = new MongoClient(uri);
      await client.connect();
      if (!inputData.email || !inputData.password) {
        throw new Error("Both 'email' and 'password' fields are required.");
      }
      console.log("connected to MongoDB");
      console.log("email=", inputData.email);
      console.log("password=", inputData.password);
      const user = await client
        .db(database)
        .collection(colAuthen)
        .findOne({ email: inputData.email });

      if (user && (await bcrypt.compare(inputData.password, user.password))) {
        console.log("Authentication Successful!");
        return true;
      } else {
        console.log("Authentication Failed!");
        return false;
      }
    } catch (error) {
      console.error("authentication error:", error.message);
      return false;
    } finally {
      client.close();
    }
  };

  myDB.getAllRequests = async () => {
    let client;
    try {
      client = new MongoClient(uri);
      await client.connect();
      console.log("connected to MongoDB");

      return await client
        .db(database)
        .collection(colRequests)
        .find({})
        .toArray(); // Replace with your database name
    } finally {
      client.close();
    }
  };

  myDB.deleteRequest = async (request) => {
    let client;
    try {
      if (!request.id) {
        throw new Error("id is required");
      }
      client = new MongoClient(uri);
      await client.connect();
      console.log("connected to MongoDB");

      const result = await client
        .db(database)
        .collection(colRequests)
        .deleteOne({ id: request.id });

      if (result.deletedCount === 1) {
        console.log("Delete Successful!");
        return true;
      } else {
        console.log("Delete Failed!");
        return false;
      }
    } catch (error) {
      console.error("Request error 111:", error.message);
      return false;
    } finally {
      client.close();
    }
  };

  myDB.updateRequest = async (request) => {
    let client;
    try {
      client = new MongoClient(uri);
      await client.connect();
      console.log(request);
      if (!request.id) {
        throw new Error("id is required");
      }
      console.log("connected to MongoDB");
      const filter = { id: request.id };

      const update = {
        $set: {
          name: request.name,
          department: request.department,
          item: request.item,
        },
      };

      const result = await client
        .db(database)
        .collection(colRequests)
        .updateOne(filter, update);
      console.log(result.matchedCount);
      if (result.matchedCount === 0) {
        console.log("No document was updated");
        return false;
      } else {
        console.log("Document was updated successfully");
        return true;
      }
    } catch (error) {
      console.error("Request error 123:", error.message);
      return false;
    } finally {
      client.close();
    }
  };

  return myDB;
}
export default MongoDBUtil();
