import type { Context, ActionSchema } from 'moleculer';

type Params = {
  name: string;
};

const actionSchema: ActionSchema = {
  rest: 'GET /hello',
  params: {
    name: 'string',
  },
  handler(ctx: Context<Params, { '$statusCode': number }>) {
    const { name } = ctx.params;
    ctx.meta.$statusCode = 200;

    return {
      code: 200,
      message: `Hello ${name}, world!`,
    };
  },
};

export default actionSchema;
