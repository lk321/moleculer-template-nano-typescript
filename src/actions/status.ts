import type { ActionSchema } from 'moleculer';
import Container from 'typedi';

import StatusService from '../services/status';

const actionSchema: ActionSchema = {
  rest: 'GET /status',
  handler() {
    const service = Container.get(StatusService);

    return service.count();
  },
};

export default actionSchema;
