const { ethers, Wallet } = require("ethers");
require("dotenv").config();
const NFTMinter = require("./abis/NFTMinter.json");

let provider, contract, wallet;

if (!process.env.PROVIDER) {
    throw new Error("PROVIDER not set");
}
if (!process.env.NFTMINTER_ADDRESS) {
    throw new Error("NFTMINTER_ADDRESS not set");
}

provider = new ethers.providers.JsonRpcProvider({
    url: process.env.PROVIDER,
});
wallet = new Wallet(process.env.PRIVATE_KEY, provider);
contract = new ethers.Contract(
    process.env.NFTMINTER_ADDRESS,
    NFTMinter.abi,
    wallet
);

module.exports = contract;
