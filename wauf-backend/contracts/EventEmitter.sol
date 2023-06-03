// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11; 

contract EventEmitter {
    event SupplyChainLog(string name, string supplyChain);

    function emitSupplyChainLog(string memory _name, string memory _entity) external {
        emit SupplyChainLog(_name, _entity);
    }
}