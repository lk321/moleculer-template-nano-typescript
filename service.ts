import {
  Service,
  ServiceBroker,
} from 'moleculer';

import * as actions from './actions';

import MongooseMixin from './mixins/connection.mixin';

export default class extends Service {
  public constructor(public broker: ServiceBroker) {
    super(broker);

    this.parseServiceSchema({
      name: 'nano',
      mixins: [new MongooseMixin()],
      actions,
      hooks: {
        error: {
          '*': function (ctx, err) {
            this.logger.error(
              `Error occurred when '${ctx.action.name}' action was called`,
              err,
            );

            throw err;
          },
        },
      },
    });
  }
}
