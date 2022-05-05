import { Context } from 'moleculer';

export = {
  rest: 'GET /hello',
  async handler(ctx: Context<{}, { '$statusCode': number }>) {
    ctx.meta.$statusCode = 200;

    return {
      code: 200,
      message: 'Hello, world!',
    };
  },
};
