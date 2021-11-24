import { Models } from '@rematch/core';

import currentTransaction from './currentTransaction';
import environment from './environment';
import wallet from './wallet';

export interface RootModel extends Models<RootModel> {
  environment: typeof environment;
  wallet: typeof wallet;
  currentTransaction: typeof currentTransaction;
}

export const models: RootModel = { environment, wallet, currentTransaction };
