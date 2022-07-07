import Repository from '../repositories/status.repository';

export = {
  rest: 'GET /status',
  async handler() {
    const repository = new Repository();

    return repository.count();
  },
};
