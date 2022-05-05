import { BrokerOptions, Errors } from 'moleculer';

import { getUniqId, getRandomBytes } from './utils/func';

const brokerConfig: BrokerOptions = {
  // Namespace of nodes to segment your nodes on the same network.
  namespace: process.env.NAMESPACE || 'microservices',
  nodeID: `external-${getUniqId()}-${getRandomBytes()}`,
  metadata: {},
  logger: {
    type: 'Console',
    options: {
      colors: true,
      moduleColors: false,
      formatter: 'full',
      objectPrinter: null,
      autoPadding: false,
    },
  },
  logLevel: 'info',
  transporter: {
    type: 'NATS',
    options: {
      url: process.env.NATS_URI,
      maxPacketSize: 60 * 1024 * 1024,
      maxConnections: process.env.MAX_CONNECTIONS || 40,
    },
  },
  cacher: false,
  serializer: 'JSON',
  requestTimeout: 10 * 1000,
  retryPolicy: {
    enabled: false,
    retries: 5,
    delay: 100,
    maxDelay: 1000,
    factor: 2,
    check: (err: Errors.MoleculerError) => err && !!err.retryable,
  },
  maxCallLevel: 100,
  heartbeatInterval: 10,
  heartbeatTimeout: 30,
  contextParamsCloning: false,
  tracking: {
    enabled: false,
    shutdownTimeout: 5000,
  },
  disableBalancer: false,
  registry: {
    strategy: 'RoundRobin',
    preferLocal: true,
  },
  circuitBreaker: {
    enabled: false,
    threshold: 0.5,
    minRequestCount: 20,
    windowTime: 60,
    halfOpenTime: 10 * 1000,
    check: (err: Errors.MoleculerError) => err && err.code >= 500,
  },
  bulkhead: {
    enabled: false,
    concurrency: 10,
    maxQueueSize: 100,
  },
  validator: true,
  errorHandler: null,
  middlewares: [],
};

export = brokerConfig;
