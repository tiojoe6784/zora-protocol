// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import "forge-std/Test.sol";
import "../src/ZoraFactoryImpl.sol";

contract SimulateCreatorCoin is Test {
    ZoraFactoryImpl factory;

    function setUp() public {
        factory = ZoraFactoryImpl(0x777777751622c0d3258f214F9DF38E35BF45baF3);
    }

    function testSimulateDeployCreatorCoin() public {
        address payoutRecipient = 0xb843A2D0D4B9E628500d2E0f6f0382e063C14a95;
        address[] memory owners = new address[](1);
        owners[0] = payoutRecipient;
        string memory uri = "https://raw.githubusercontent.com/jost305/zora-protocol/main/examples/coin-creation/sample-metadata.json";
        string memory name = "TEST YES";
        string memory symbol = "SAMPL";
        bytes memory poolConfig = hex"040000000000000000000000000000000000000000000000000000000000800a00000000000000000000000000000000000000000000000000000000000000c00000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000014000000000000000000000000000000000000000000000000000000000000001800000000000000000000000000000000000000000000000000000000000000001fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffde4f000000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000013c680000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000b000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000b1a2bc2ec50000";
        address platformReferrer = address(0);
        bytes32 coinSalt = 0xef5441530e3c186c734a636eec88f6e9de3a32a2d331d149ea6d0c555a5df401;

        // Simulate the call and catch the revert reason
        try factory.deployCreatorCoin(
            payoutRecipient,
            owners,
            uri,
            name,
            symbol,
            poolConfig,
            platformReferrer,
            coinSalt
        ) returns (address coin) {
            emit log_named_address("Simulated coin address", coin);
        } catch (bytes memory err) {
            emit log("Simulation reverted with:");
            emit log_bytes(err);
        }
    }
}
