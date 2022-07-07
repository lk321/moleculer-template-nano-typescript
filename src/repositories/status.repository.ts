import GenericRepository from './generic.repository';

import Status from '../entities/status';

export default class StatusRepository extends GenericRepository<typeof Status> {
  constructor() {
    super(Status, ['type', 'warehouse']);
  }

  async count(): Promise<number> {
    return this.model.countDocuments();
  }
}
