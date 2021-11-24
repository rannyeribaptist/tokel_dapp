import { createModel } from '@rematch/core';
import dp from 'dot-prop-immutable';

import { TxType, UnspentType } from 'util/nspvlib-mock';
import { getStillUnconfirmed, parseBlockchainTransaction, parseSpendTx } from 'util/transactions';
import { TICKER, TokenFilter } from 'vars/defines';

import type { RootModel } from './models';

export type Asset = {
  name: string;
  ticker?: string;
  balance?: number;
  usd_value?: number;
};

interface LoginArgs {
  data: {
    wif: string;
    address: string;
    seed: string;
    pubkey: string;
  };
  setError: (message: string) => void;
  setFeedback: (message: string) => void;
}

export type TFI = typeof TokenFilter[keyof typeof TokenFilter];
export type WalletState = {
  chosenAsset?: string;
  assets: Array<Asset>;
  chosenToken?: string;
  tokenBalances: Record<string, number>;
  tokenFilterId: TFI;
  tokenSearchTerm: string;
  address?: string;
  unspent?: UnspentType;
  txs: {
    [address: string]: Array<TxType>;
  };
  key: string;
  seed: string;
  pubkey: string;
  chosenTx: TxType;
};

export default createModel<RootModel>()({
  state: {
    chosenAsset: TICKER,
    assets: [],
    chosenToken: null,
    tokenBalances: {},
    tokenFilterId: TokenFilter.ALL,
    tokenSearchTerm: '',
    address: null,
    unspent: null,
    txs: {},
    key: null,
    pubkey: null,
  } as WalletState,
  reducers: {
    SET_ADDRESS: (state, address: string) => ({
      ...state,
      address,
    }),
    SET_TXS: (state, txs: Array<TxType>) => {
      if (!state.address) {
        return state;
      }
      const unconfirmed = getStillUnconfirmed(txs, state.txs[state.address]);
      const newTxs = txs.map(tx => parseBlockchainTransaction(tx, state.address));
      return dp.set(state, `txs.${state.address}`, unconfirmed.concat(newTxs));
    },
    ADD_NEW_TX: (state, transaction: TxType) =>
      dp.set(state, `txs.${state.address}`, list => [
        parseSpendTx(transaction, state.address),
        ...list,
      ]),
    SET_UNSPENT: (state, unspent: UnspentType) => ({
      ...state,
      unspent,
    }),
    SET_CHOSEN_TX: (state, chosenTx: TxType) => ({
      ...state,
      chosenTx,
    }),
    SET_KEY: (state, key: string) => ({
      ...state,
      key,
    }),
    SET_SEED: (state, seed: string) => ({
      ...state,
      seed,
    }),
    SET_PUBKEY: (state, pubkey: string) => ({
      ...state,
      pubkey,
    }),
    SET_CC_DETAILS: (state, ccdetails: string) => ({
      ...state,
      ccdetails,
    }),
    // SET_CHOSEN_ASSET: (state, chosenAsset: string) => ({ ...state, chosenAsset }),
    SET_ASSETS: (state, assets: Array<Asset>) => ({ ...state, assets }),
    UPDATE_ASSET_BALANCE: (state, asset: Asset) => {
      const indx = state.assets.findIndex(a => a.name === asset.name);
      return dp.set(state, `assets.${indx}.balance`, v => v + asset.balance);
    },
    SET_TOKEN_FILTER_ID: (state, tokenFilterId: TFI) => ({ ...state, tokenFilterId }),
    SET_TOKEN_SEARCH_TERM: (state, tokenSearchTerm: string) => ({ ...state, tokenSearchTerm }),
    SET_CHOSEN_TOKEN: (state, chosenToken: string) => ({ ...state, chosenToken }),
    SET_TOKEN_BALANCES: (state, tokenBalances: Record<string, number>) => ({
      ...state,
      tokenBalances,
    }),
    UPDATE_TOKEN_BALANCE: (state, tokenid: string, balance: number) =>
      dp.set(state, `tokenBalances.${tokenid}`, v => v - balance),
  },
  effects: dispatch => ({
    async login({ data }: LoginArgs) {
      this.SET_KEY(data.wif);
      this.SET_PUBKEY(data.pubkey);
      this.SET_ADDRESS(data.address);
    },
    logout() {
      dispatch({ type: 'RESET_APP' });
    },
  }),
});
