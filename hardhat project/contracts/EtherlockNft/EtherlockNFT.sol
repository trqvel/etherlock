//  ▄▀▀█▄▄▄▄  ▄▀▀▀█▀▀▄  ▄▀▀▄ ▄▄   ▄▀▀█▄▄▄▄  ▄▀▀▄▀▀▀▄  ▄▀▀▀▀▄    ▄▀▀▀▀▄   ▄▀▄▄▄▄   ▄▀▀▄ █ 
// ▐  ▄▀   ▐ █    █  ▐ █  █   ▄▀ ▐  ▄▀   ▐ █   █   █ █    █    █      █ █ █    ▌ █  █ ▄▀ 
//   █▄▄▄▄▄  ▐   █     ▐  █▄▄▄█    █▄▄▄▄▄  ▐  █▀▀█▀  ▐    █    █      █ ▐ █      ▐  █▀▄  
//   █    ▌     █         █   █    █    ▌   ▄▀    █      █     ▀▄    ▄▀   █        █   █ 
//  ▄▀▄▄▄▄    ▄▀         ▄▀  ▄▀   ▄▀▄▄▄▄   █     █     ▄▀▄▄▄▄▄▄▀ ▀▀▀▀    ▄▀▄▄▄▄▀ ▄▀   █  
//  █    ▐   █          █   █     █    ▐   ▐     ▐     █                █     ▐  █    ▐  
//  ▐        ▐          ▐   ▐     ▐                    ▐                ▐        ▐       

// SPDX-License-Identifier: etherlock
// Etherlock License (c) [2023]

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract Nft is ERC721Enumerable, Ownable {
    using SafeMath for uint256;
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIds;

    uint public MAX_SUPPLY = 10000000;
    uint public constant PRICE = 0.001 ether;
    uint public MAX_PER_MINT = 10;

    string public baseTokenURI;

    constructor(string memory baseURI) ERC721("EtherlockNFT", "ETLN") {
        setBaseURI(baseURI);
    }

    function setMaxPerMint(uint _maxPerMint) public onlyOwner {
        MAX_PER_MINT = _maxPerMint;
    }

    function setMaxSupply(uint _maxSupply) public onlyOwner {
        MAX_SUPPLY = _maxSupply;
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return baseTokenURI;
    }

    function setBaseURI(string memory _baseTokenURI) public onlyOwner {
        baseTokenURI = _baseTokenURI;
    }

    function mintNFTs(uint _count) public payable {
        uint totalMinted = _tokenIds.current();

        require(totalMinted.add(_count) <= MAX_SUPPLY, "Not enough NFTs left!");
        require(_count >0 && _count <= MAX_PER_MINT, "Cannot mint specified number of NFTs.");
        require(msg.value >= PRICE.mul(_count), "Not enough ether to purchase NFTs.");

        for (uint i = 0; i < _count; i++) {
            _mintSingleNFT();
        }
    }

    function _mintSingleNFT() private {
        uint newTokenID = _tokenIds.current();
        _safeMint(msg.sender, newTokenID);
        _tokenIds.increment();
    }

    function tokensOfOwner(address _owner) external view returns (uint[] memory) {

        uint tokenCount = balanceOf(_owner);
        uint[] memory tokensId = new uint256[](tokenCount);

        for (uint i = 0; i < tokenCount; i++) {
            tokensId[i] = tokenOfOwnerByIndex(_owner, i);
        }
        return tokensId;
    }

    function withdraw() public payable onlyOwner {
        uint balance = address(this).balance;
        require(balance > 0, "No ether left to withdraw");

        (bool success, ) = (msg.sender).call{value: balance}("");
        require(success, "Transfer failed.");
    }

}