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

contract MyToken is ERC20 {
    constructor(string memory name, string memory symbol) ERC20(name, symbol) {}

    function mint(address to, uint256 amount) public {
        _mint(to, amount);
    }
}

contract CryptoSubs {
    address payable public owner;
    MyToken public token;

    struct Subscription {
        uint256 lastClaimed;
        uint256 subscriptionTime;
        uint256 subscriptionRate;
        bool isCancelled;
    }

    mapping(address => Subscription) public subscriptions;

    constructor(string memory name, string memory symbol) { 
        owner = payable(msg.sender); 
        token = new MyToken(name, symbol); 
    }

    function startSubscription(uint256 time, uint256 rate) public payable { 
        require(msg.value == 0.001 ether, "Subscription costs 0.001 ether"); 

        subscriptions[msg.sender] = Subscription({ 
            lastClaimed: block.timestamp, 
            subscriptionTime: time, 
            subscriptionRate: rate, 
            isCancelled: false 
        }); 
    }

    function claimTokens() public { 
        require(subscriptions[msg.sender].isCancelled == false, "Subscription cancelled"); 

        uint256 timePassed = block.timestamp - subscriptions[msg.sender].lastClaimed; 
        require(timePassed > subscriptions[msg.sender].subscriptionTime, "Not enough time has passed"); 

        uint256 tokensToMint = timePassed / subscriptions[msg.sender].subscriptionTime * subscriptions[msg.sender].subscriptionRate; 

        subscriptions[msg.sender].lastClaimed = block.timestamp; 

        token.mint(msg.sender, tokensToMint); 
    }
    
    function cancelSubscription() public { 
        require(subscriptions[msg.sender].isCancelled == false, "Subscription cancelled"); 

        subscriptions[msg.sender].isCancelled = true; 
    } 

    function withdraw() public { 
        require(msg.sender == owner, "Only owner can withdraw funds"); 

        uint256 balance = address(this).balance; 

        require(balance > 0, "No funds available for withdrawal"); 

        owner.transfer(balance); 
    }
}
