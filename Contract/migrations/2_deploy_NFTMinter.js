const NFTMinter = artifacts.require("NFTMinter");

module.exports = async function (deployer) {
  await deployer.deploy(NFTMinter);
  const deployedNFTMinter =  await NFTMinter.deployed();
  const NFTMinterAddress = deployedNFTMinter.address;
  console.log("NFTAddress", NFTMinterAddress);
};