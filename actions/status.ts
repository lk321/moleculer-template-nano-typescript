import openConnection from '../database/openConnection';

import StatusModel from '../database/entities/Status';

export = {
  rest: 'GET /status',
  async handler() {
    await openConnection();

    return StatusModel.find();
  },
};
