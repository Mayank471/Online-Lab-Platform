import mongoose from 'mongoose';
import dotenv from "dotenv";
dotenv.config();

// Serverless invocations reuse a warm container, so cache the connection on the
// global object. Without this every request would open a new pool and exhaust
// the Atlas connection limit.
const globalCache = globalThis.__mongooseCache ?? { conn: null, promise: null };
globalThis.__mongooseCache = globalCache;

export const connectDB = async () => {
    if (globalCache.conn) return globalCache.conn;

    if (!process.env.MONGO_URI) {
        throw new Error("MONGO_URI is not set");
    }

    if (!globalCache.promise) {
        globalCache.promise = mongoose
            .connect(process.env.MONGO_URI, {
                // Fail fast instead of hanging until the platform kills the request.
                serverSelectionTimeoutMS: 10000,
            })
            .then((conn) => {
                console.log(`mongodb connected: ${conn.connection.host}`);
                return conn;
            })
            .catch((error) => {
                // Drop the rejected promise so the next request retries.
                globalCache.promise = null;
                throw error;
            });
    }

    globalCache.conn = await globalCache.promise;
    return globalCache.conn;
}
