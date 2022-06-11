// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract NFTMinter is ERC721, ERC721Enumerable {

  struct NFT {
    string tokenURI;
    string fileType;
    string content;
  }

  NFT[] nfts;
  mapping(string => bool) _tokenURIExists;

  constructor() 
    ERC721("NFT Minter", "NFTM") 
  {
  }

  function _beforeTokenTransfer(address from, address to, uint256 tokenId) internal override(ERC721, ERC721Enumerable) {
    super._beforeTokenTransfer(from, to, tokenId);
  }

  function supportsInterface(bytes4 interfaceId) public view override(ERC721, ERC721Enumerable) returns (bool) {
    return super.supportsInterface(interfaceId);
  }

  function safeMintImage(address _minter, string memory _tokenURI) public {
    require(!_tokenURIExists[_tokenURI], 'The token URI should be unique');
    nfts.push(NFT(_tokenURI, "image", ''));
    uint _id = nfts.length;
    _safeMint(_minter, _id);
    _tokenURIExists[_tokenURI] = true;
  }

  function safeMintText(address _minter, string memory _content) public {
    nfts.push(NFT('', "text", _content));
    uint _id = nfts.length;
    _safeMint(_minter, _id);
  }

  function fetchNFTs() public view returns(NFT[] memory) {
    return nfts;
  }

  function fetchNFT(uint tokenId) public view returns(NFT memory) {
    require(_exists(tokenId), 'ERC721Metadata: URI query for nonexistent token');
    return nfts[tokenId - 1];
  }
}