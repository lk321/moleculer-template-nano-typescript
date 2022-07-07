import {
  Service,
  ServiceBroker,
} from 'moleculer';

import * as actions from './actions';
import loaders from './loaders';

export default class extends Service {
  public constructor(public broker: ServiceBroker) {
    super(broker);

    this.parseServiceSchema({
      name: 'nano',
      actions,
      started: async () => {
        await loaders.init();
      },
      async stopped() {
        await loaders.destroy();
      },
    });
  }
}
