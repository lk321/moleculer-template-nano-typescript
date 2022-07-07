/* eslint-disable global-require */
import { BrokerOptions } from 'moleculer';

import { getUniqId } from './src/utils/func';

let nodeID = null;
if (require('fs').existsSync('./package.json')) nodeID = require('./package.json').name;

const brokerConfig: BrokerOptions = {
  namespace: getUniqId(),
  nodeID,
  logger: {
    type: 'Console',
    options: {
      colors: true,
      moduleColors: false,
      formatter: 'short',
      objectPrinter: null,
      autoPadding: false,
    },
  },
  logLevel: 'info',
  cacher: false,
  transporter: {
    type: 'NATS',
    options: {
      maxPacketSize: 50 * 1024 * 1024,
    },
  },
};

export = brokerConfig;
