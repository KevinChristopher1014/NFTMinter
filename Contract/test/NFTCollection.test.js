const { expectRevert } = require('@openzeppelin/test-helpers');

const NFTMinter = artifacts.require("NFTMinter");

contract('NFTMinter', (accounts) => {
  let contract;

  before(async () => {
    contract = await NFTMinter.new();
  });

  describe('deployment', () => {
    it('deploys successfully', async () => {
      const address = contract.address;
      assert.notEqual(address, 0x0);
      assert.notEqual(address, '');
      assert.notEqual(address, null);
      assert.notEqual(address, undefined);
    });

    it('has a name', async() => {
      const name = await contract.name();
      assert.equal(name, 'NFT Minter');
    });

    it('has a symbol', async() => {
      const symbol = await contract.symbol();
      assert.equal(symbol, 'NFTM');
    });
  });

  describe('minting', () => {
    it('creates a new token', async () => {

      await contract.safeMintImage('0x441eC70Ca587Dd0d180023F2C8e9471d03be4983', 'testURI');
      await contract.safeMintText('0x441eC70Ca587Dd0d180023F2C8e9471d03be4983', 'This is a text');

      const totalSupply = await contract.totalSupply();

      console.log("TotalSupply:", totalSupply.toNumber());

      const nfts = await contract.fetchNFTs();

      console.log("NFTs:", nfts);

      const nft = await contract.fetchNFT(1);
      console.log("NFT 1:", nft);

      const owner = await contract.ownerOf(1);
      console.log("owner of NFT 1", owner);
    });
  });
});