import Agenda from 'agenda';
import { Container } from 'typedi';

import * as dbLoader from './mongoose';
import { loggerInstance } from './logger';
import { dependencyInjector } from './dependencyInjector';

type LoaderOptions = {
  dbOptions?: {
    dbName?: string;
    authSource?: string;
    directConnection?: boolean;
    autoIndex?: boolean;
  };
};

export const init = async ({ dbOptions }: LoaderOptions = {}) => {
  const mongoConnection = await dbLoader.initialize(dbOptions);

  loggerInstance.info('✌️ DB loaded and connected!');

  // It returns the agenda instance because it's needed in the subsequent loaders
  dependencyInjector({ mongoConnection });

  loggerInstance.info('✌️ Dependency Injector loaded');
};

export const destroy = async () => {
  const agendaInstance = Container.get<Agenda>('agendaInstance');

  await dbLoader.destroy();

  agendaInstance.removeAllListeners();
  await agendaInstance.stop();
};

export default {
  init,
  destroy,
};
