// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

interface IERC {
     function approve(address _spender, uint _value) external;
     function balanceOf(address _owner) external view returns (uint balance); 
}