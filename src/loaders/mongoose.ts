import mongoose from 'mongoose';

const {
  MONGO_URI,
  MONGO_DEFAULT_DATABASE,
} = process.env;

let cachedDB: any = null;

export const initialize = async (
  {
    dbName = MONGO_DEFAULT_DATABASE,
    authSource = 'admin',
    directConnection = true,
    autoIndex = true,
  } = {},
) => {
  if (!cachedDB) {
    cachedDB = await mongoose.connect(MONGO_URI, {
      dbName,
      authSource,
      directConnection,
      autoIndex,
    });
  }
};

export const destroy = async () => {
  if (cachedDB) {
    await cachedDB.connection.close();
    await mongoose.disconnect();

    cachedDB = null;
  }
};
