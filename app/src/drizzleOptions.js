import Web3 from 'web3';

import Cryptomons from './contracts/Cryptomons.json';

const options = {
  web3: {
    block: false,
    customProvider: new Web3('ws://localhost:8545')
  },
  contracts: [Cryptomons],
  polls: {
    accounts: 1500
  }
};

export default options;
