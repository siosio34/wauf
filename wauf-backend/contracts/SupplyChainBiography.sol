// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11; 

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import {IEventEmitter} from "./interfaces/IEventEmitter.sol";

contract SupplyChainBiography is ERC721 {
    using Counters for Counters.Counter;

    struct SupplyChainInfo {
        int256 latitude;
        int256 longitude;
        string entityName;
        string location;
        string action;
        uint256 timestamp;
    } 

    struct Coordinate {
        int256 latitude;
        int256 longitude;
    }

    Counters.Counter private _tokenIds;

    address emitter;
    SupplyChainInfo[] public supplyChainInfos;
    mapping(address => bool) public isSupplyChain;
    mapping(address => Coordinate) public coordinateMap;
    mapping(address => string) public entityMap; 
    mapping(address => string) public locationMap;
    mapping(address => string) public actionMap;

    event RegisterSupplyChain(address supplyChain, bool isActive);
    event AddSupplyChainInfo(string entityName, string location, string action, uint256 timestamp);

    modifier onlySupplyChain() {
        _onlySupplyChain();
        _;
    }

    constructor(string memory _name, string memory _symbol, address _emitter) ERC721(_name, _symbol) {
        emitter = _emitter;
    }

    function registerSupplyChain(
        address _supplyChain, 
        bool _isActive, 
        Coordinate memory _coordinate,
        string calldata _entity,
        string calldata _location,
        string calldata _action
    ) external {
        require(_supplyChain != address(0), "invalid address");
        require(isSupplyChain[_supplyChain] == false, "supply chain already registered");
        isSupplyChain[_supplyChain] = _isActive;
        coordinateMap[_supplyChain] = _coordinate;
        entityMap[_supplyChain] = _entity;
        locationMap[_supplyChain] = _location;
        actionMap[_supplyChain] = _action;

        IEventEmitter(emitter).emitSupplyChainLog(this.name(), _entity);

        emit RegisterSupplyChain(_supplyChain, _isActive);
    }

    function _onlySupplyChain() internal view {
        require(isSupplyChain[msg.sender] == true, "only authorized supply chain");
    }

    function addSupplyChainInfo(address _supplyChain) external onlySupplyChain {
        
        Coordinate memory coordinate = coordinateMap[_supplyChain];
        string memory entity = entityMap[_supplyChain];
        string memory location = locationMap[_supplyChain];
        string memory action = actionMap[_supplyChain];

        SupplyChainInfo memory info = SupplyChainInfo(
            coordinate.latitude,
            coordinate.longitude,
            entity,
            location,
            action,
            block.timestamp
        );

        supplyChainInfos.push(info);

        emit AddSupplyChainInfo(entity, location, action, block.timestamp);
    }
    
    function getSupplyChainInfo() external view returns(SupplyChainInfo[] memory) {
        SupplyChainInfo[] memory infos = new SupplyChainInfo[](supplyChainInfos.length);
        
        for (uint256 i = 0; i < supplyChainInfos.length; i++) {
            infos[i] = supplyChainInfos[i];
        }
        
        return infos;
    }

    function mint() external returns(uint256) {
        _tokenIds.increment();
        uint256 tokenId = _tokenIds.current();
        _safeMint(msg.sender, tokenId);
        return tokenId;
    }
}