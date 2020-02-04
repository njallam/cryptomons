const Cryptomons = artifacts.require('Cryptomons');

module.exports = async deployer => {
  await deployer.deploy(Cryptomons);
  instance = await Cryptomons.deployed();
  await instance.create(1, '10000000000000000000');
  await instance.create(4, '10000000000000000000');
  await instance.create(7, '10000000000000000000');
};
