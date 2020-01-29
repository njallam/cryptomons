import Web3 from 'web3';

const options = {
  web3: {
    block: false,
    customProvider: new Web3('ws://localhost:8545')
  },
  contracts: [],
  events: {
    SimpleStorage: ['StorageSet']
  },
  polls: {
    accounts: 1500
  }
};

export default options;
