import 'dotenv/config';
import mongoose from 'mongoose';

const {
  MONGO_URI,
  MONGO_DEFAULT_DATABASE,
} = process.env;

let cachedDB: any = null;

export default async function openConnection({ dbName = MONGO_DEFAULT_DATABASE } = {}) {
  if (!cachedDB) {
    cachedDB = await mongoose.connect(MONGO_URI as string, {
      dbName,
    });
  }
}
