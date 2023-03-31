import {
  set, connect, disconnect, Mongoose,
} from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

set('strictQuery', false);

interface InitializeOptions {
  dbName?: string;
  authSource?: string;
  directConnection?: boolean;
  autoIndex?: boolean;
}

let cachedConnectionPromise: Promise<Mongoose> | null = null;
let cachedDBTest: MongoMemoryServer;

export const initialize = async (options: InitializeOptions = {}) => {
  let mongoConnectionUri = process.env.CONN_URL;

  if (!cachedDBTest && process.env.NODE_ENV === 'test') {
    cachedDBTest = await MongoMemoryServer.create();
    mongoConnectionUri = cachedDBTest.getUri();
  }

  if (!cachedConnectionPromise) {
    cachedConnectionPromise = connect(mongoConnectionUri as string, {
      dbName: options?.dbName || process.env.CONN_DEFAULT_DATABASE,
      authSource: options?.authSource || 'admin',
      directConnection: options?.directConnection || false,
      autoIndex: options?.autoIndex ?? true,
    });
  }

  return cachedConnectionPromise;
};

export const destroy = async () => {
  if (cachedConnectionPromise) {
    const connection = await cachedConnectionPromise;

    await connection.connection.close();
    await disconnect();

    cachedConnectionPromise = null;
  }

  if (process.env.NODE_ENV === 'test' && cachedDBTest) {
    await cachedDBTest.stop();
  }
};

export const getCachedConnection = async () => cachedConnectionPromise;
