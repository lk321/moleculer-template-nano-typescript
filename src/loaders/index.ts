import * as dbLoader from './mongoose';

export const init = async ({ dbOptions }: LoaderOptions = {}) => {
  await dbLoader.initialize(dbOptions);
};

export const destroy = async () => {
  await dbLoader.destroy();
};

export default {
  init,
  destroy,
};
