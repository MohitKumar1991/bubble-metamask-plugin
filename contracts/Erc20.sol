pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MohitToken is ERC20 {
    constructor() public ERC20("MOHIT", "MHT") {
        _mint(msg.sender, 100000000000000000000000);
    }
}
