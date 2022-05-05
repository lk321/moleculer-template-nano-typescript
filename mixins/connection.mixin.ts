import 'dotenv/config';
import mongoose from 'mongoose';
import { Service, ServiceSchema } from 'moleculer';

const {
  CONN_USER,
  CONN_PASSWORD,
  CONN_HOST,
  CONN_PORT,
  CONN_DATABASE,
} = process.env;

mongoose.Promise = global.Promise;

export default class Connection implements Partial<ServiceSchema>, ThisType<Service> {
  private isConnected: boolean = false;

  public created() {
    if (this.isConnected) {
      return Promise.resolve();
    }

    return mongoose.connect(`mongodb://${CONN_HOST}:${CONN_PORT}`, {
      dbName: CONN_DATABASE,
      authSource: 'admin',
      directConnection: true,
      readPreference: 'primary',
      ssl: false,
      auth: {
        username: CONN_USER,
        password: CONN_PASSWORD,
      },
    }).then((db: any) => {
      this.isConnected = db.connections[0].readyState === 1;
    });
  }

  public stopped(): Promise<void> {
    return mongoose.connection.close();
  }
}
