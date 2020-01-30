const Cryptomons = artifacts.require('Cryptomons');

module.exports = async deployer => {
  await deployer.deploy(Cryptomons);
  instance = await Cryptomons.deployed();
  await instance.create(1, 0);
};
