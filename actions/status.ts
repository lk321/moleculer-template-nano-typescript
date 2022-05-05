export = {
  rest: 'GET /status',
  handler() {
    return this.broker.ping();
  },
};
