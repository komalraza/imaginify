import mongoose, { Mongoose, mongo } from "mongoose";

const MONGDB_URL = process.env.MONGO_DB_URL;

interface MongooseConnection {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

// Cache mongooose connection

let cached: MongooseConnection = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = {
    conn: null,
    promise: null,
  };
}

export const connectToDatabase = async () => {
  if (cached.conn) return cached.conn;   //Cached connection exists

  if (!MONGDB_URL) throw new Error("Missing Mongo DB connection URL");


//   Create a new MongoDB connection 
  cached.promise =
    cached.promise ||
    mongoose.connect(MONGDB_URL, {
      dbName: "imaginify",
      bufferCommands: false,
    });

  cached.conn = await cached.promise;
  return cached.conn;
};
