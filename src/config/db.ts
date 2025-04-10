import mongoose, { Mongoose } from "mongoose";

// Extend globalThis type
declare global {
  interface GlobalThis {
    _mongoose?: {
      conn: Mongoose | null;
      promise: Promise<Mongoose> | null;
    };
  }
}

// Safely cast globalThis to include _mongoose
const globalWithMongoose = globalThis as unknown as GlobalThis;

// Fallback to cached values or initialize
globalWithMongoose._mongoose ??= {
  conn: null,
  promise: null,
};

export default async function connectDb(): Promise<Mongoose> {
  if (globalWithMongoose._mongoose!.conn) {
    return globalWithMongoose._mongoose!.conn;
  }

  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("MONGODB_URI environment variable is not defined");
  }

  if (!globalWithMongoose._mongoose!.promise) {
    globalWithMongoose._mongoose!.promise = mongoose.connect(uri);
  }

  globalWithMongoose._mongoose!.conn = await globalWithMongoose._mongoose!
    .promise;
  return globalWithMongoose._mongoose!.conn;
}
