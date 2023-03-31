import Agenda from 'agenda';
import type { Mongoose } from 'mongoose';

type Params = {
  mongoConnection: Mongoose;
};

export function agendaFactory({ mongoConnection }: Params) {
  const { connections: [connection] } = mongoConnection;

  return new Agenda({
    mongo: connection.db,
    db: {
      address: process.env.MONGO_URI,
      collection: process.env.MONGO_DEFAULT_DATABASE,
    },
    processEvery: '30 minutes',
    maxConcurrency: 20,
  });
}
