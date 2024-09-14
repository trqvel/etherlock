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

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract EtherlockNFTFabric is ERC721, Ownable {
    uint256 public contractPrice = 0.001 ether;
    uint256 public totalSupply;

    constructor(string memory name, string memory symbol) ERC721(name, symbol) {}

    function createSmartContract(uint256 numberOfContracts) public payable {
        require(msg.value == numberOfContracts * contractPrice, "Incorrect amount sent");
        for (uint256 i = 0; i < numberOfContracts; i++) {
            uint256 tokenId = totalSupply + 1;
            totalSupply++;
            _safeMint(msg.sender, tokenId);
        }
    }

    function withdraw(uint256 amount) public onlyOwner {
        require(address(this).balance >= amount, "Insufficient balance");
        payable(msg.sender).transfer(amount);
    }
}


