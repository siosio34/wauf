// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11; 

interface IEventEmitter {
    function emitSupplyChainLog(string calldata _name, string calldata _entity) external;
}