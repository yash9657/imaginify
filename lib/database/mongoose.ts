import mongoose, { Mongoose } from "mongoose";

const MONGODB_URL = process.env.MONGODB_URL

interface MongooseConnection {
    conn: Mongoose | null;
    promise: Promise<Mongoose> | null;
}

let cached: MongooseConnection = (global as any).mongoose;

if (!cached) {
    cached = (global as any).mongoose = { conn: null, promise: null };
}

export const connectToDatabase = async () => {
    // we check if we already have a cached connection
    if (cached.conn) return cached.conn;

    if(!MONGODB_URL) throw new Error('No MONGODB_URL');

    // if not, we make a new connection to mongodb
    cached.promise = cached.promise || mongoose.connect(MONGODB_URL, {
        dbName: 'imaginify',
        bufferCommands: false,
    });

    cached.conn = await cached.promise;
    return cached.conn;
}