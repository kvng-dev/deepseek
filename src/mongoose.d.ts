import { Mongoose } from "mongoose";

export declare global {
  const mongoose:
    | {
        conn: Mongoose | null;
        promise: Promise<Mongoose> | null;
      }
    | undefined;
}
