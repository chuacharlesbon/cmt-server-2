// lib/mongodb.js
import { MongoClient } from "mongodb";

async function connectToMongoDB() {
  // Get your MongoDB connection string from MongoDB Atlas.
  const connectionString = process.env.MONGODB_URI;
  // Connect to MongoDB.
  const client = await MongoClient.connect(connectionString);
  // Return the database connection.
  return client.db('CaptivePortal');
}

module.exports = {
  connectToMongoDB,
};
