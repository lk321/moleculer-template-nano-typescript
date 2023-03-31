import 'reflect-metadata';
import type { Service, ServiceSchema } from 'moleculer';

import * as actions from './actions';
import loaders from './loaders';

type Settings = object;

type Methods = object;

type LocalVars = {
  myVar: string;
};

type Actions = typeof actions;

export type NanoThis = Service<Settings> & Methods & LocalVars & Actions;

const NanoMicroService: ServiceSchema<Settings> = {
  name: 'nano',
  actions,
  methods: {},
  started: async () => {
    await loaders.init();
  },
  async stopped() {
    await loaders.destroy();
  },
};

export default NanoMicroService;
