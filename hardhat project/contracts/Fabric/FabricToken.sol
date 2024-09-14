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

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract MyContractFactory {
    address payable public owner;
    mapping(address => address[]) public userToContracts;
    
    function createContracts(uint256 numberOfContracts) public payable {
        uint256 cost = 0.001 ether * numberOfContracts;
        require(msg.value == cost, "You need to send the correct amount of ether");
        for (uint256 i = 0; i < numberOfContracts; i++) {
            MyContract newContract = new MyContract(msg.sender);
            userToContracts[msg.sender].push(address(newContract));
        }
    }
    
    function withdrawFromContract(address contractAddress, uint256 amount) public {
        require(msg.sender == owner, "Only the owner can withdraw funds");
        require(amount <= address(this).balance, "Insufficient balance");
        MyContract myContract = MyContract(contractAddress);
        myContract.withdraw(amount * 1 ether);
    }
}

contract MyContract is ERC20, ReentrancyGuard {
    address public owner;
    
    constructor(address _owner) ERC20("ETHERLOCK", "EHL") {
        owner = _owner;
        _mint(owner, 1 ether);
    }

    function withdraw(uint256 amount) public nonReentrant {
        require(msg.sender == owner, "Only the owner can withdraw funds");
        require(amount <= address(this).balance, "Insufficient balance");
        payable(owner).transfer(amount);
    }
    
    function transfer(address recipient, uint256 amount) public override returns (bool) {
        _transfer(msg.sender, recipient, amount);
        if (recipient == owner) {
            _mint(owner, 1 ether);
        }
        return true;
    }
}
