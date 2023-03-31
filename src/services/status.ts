import { Service } from 'typedi';

import GenericRepository from '../repositories/generic.repository';
import { Status } from '../models/status';

@Service()
export default class StatusRepository extends GenericRepository<typeof Status> {
  constructor() {
    super(Status, ['type', 'warehouse']);
  }

  async count(): Promise<number> {
    return this.model.countDocuments();
  }
}
