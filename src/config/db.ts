// import mongoose, { Mongoose } from "mongoose";

// declare global {
//   // Other global declarations can go here if needed
// }

// // Use global to persist connection across hot reloads in dev
// const globalWithMongoose = global as typeof global & {
//   _mongoose?: {
//     conn: Mongoose | null;
//     promise: Promise<Mongoose> | null;
//   };
// };

// const cached = globalWithMongoose._mongoose ?? {
//   conn: null,
//   promise: null,
// };

// globalWithMongoose._mongoose = cached;

// export default async function connectDb(): Promise<Mongoose> {
//   if (cached.conn) return cached.conn;

//   if (!cached.promise) {
//     const uri = process.env.MONGODB_URI;
//     if (!uri) {
//       throw new Error("MONGODB_URI environment variable is not defined");
//     }

//     cached.promise = mongoose.connect(uri);
//   }

//   cached.conn = await cached.promise;
//   return cached.conn;
// }
