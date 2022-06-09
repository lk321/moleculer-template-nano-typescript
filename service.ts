import {
  Service,
  ServiceBroker,
} from 'moleculer';

import * as actions from './actions';

export default class extends Service {
  public constructor(public broker: ServiceBroker) {
    super(broker);

    this.parseServiceSchema({
      name: 'nano',
      actions,
    });
  }
}
