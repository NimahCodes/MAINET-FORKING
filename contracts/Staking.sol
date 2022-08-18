// SPDX-License-Identifier:MIT
pragma solidity ^0.8.0;

contract StakeContract {

    mapping(address => uint) stakedAmount;

    uint deadline = block.timestamp + 1 minutes;

    modifier checkTimeLeft() {
        require(block.timestamp > deadline);
        _;
    }

    function stake() public payable {
        require(msg.value > 0, "can't send zero value");
        stakedAmount[msg.sender] += msg.value;
    }
 

    function withdraw() external payable checkTimeLeft {
        require(stakedAmount[msg.sender] >= 0, "user has no stake");
        uint balance = stakedAmount[msg.sender];
        stakedAmount[msg.sender] = 0;
        payable(msg.sender).transfer(balance);
    }

    function checkUserBalance() external view returns (uint) {
        return stakedAmount[msg.sender];
    }

    function checkContractBalance() external view returns (uint) {
        return address(this).balance;
    }
    
}



