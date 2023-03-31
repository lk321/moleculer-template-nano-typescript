import { Container } from 'typedi';
import { Mongoose } from 'mongoose';

import { loggerInstance } from './logger';
import { agendaFactory } from './agenda';

import * as models from '../models';

type Params = {
  mongoConnection: Mongoose;
};

export const dependencyInjector = ({ mongoConnection }: Params) => {
  try {
    Object.entries(models).filter(([name]) => name.includes('Model')).forEach(([name, model]) => {
      const modelName = name.charAt(0).toLowerCase() + name.slice(1);

      Container.set(modelName, model);
    });

    const agendaInstance = agendaFactory({ mongoConnection });

    Container.set('agendaInstance', agendaInstance);
    Container.set('logger', loggerInstance);

    loggerInstance.info('✌️ Agenda injected into container');

    return { agenda: agendaInstance };
  } catch (e) {
    loggerInstance.error('🔥 Error on dependency injector loader: %o', e);

    throw e;
  }
};
