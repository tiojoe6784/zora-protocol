// SPDX-License-Identifier: ZORA-DELAYED-OSL-v1
// This software is licensed under the Zora Delayed Open Source License.
// Under this license, you may use, copy, modify, and distribute this software for
// non-commercial purposes only. Commercial use and competitive products are prohibited
// until the "Open Date" (3 years from first public distribution or earlier at Zora's discretion),
// at which point this software automatically becomes available under the MIT License.
// Full license terms available at: https://docs.zora.co/coins/license
pragma solidity ^0.8.23;

library CoinConstants {
    /// @notice The maximum total supply
    /// @dev Set to 1 billion coins with 18 decimals
    uint256 public constant MAX_TOTAL_SUPPLY = 1_000_000_000e18;

    /// @notice The number of coins allocated to the liquidity pool
    /// @dev 990 million coins
    uint256 public constant POOL_LAUNCH_SUPPLY = 990_000_000e18;

    /// @notice The number of coins rewarded to the creator
    /// @dev 10 million coins
    uint256 public constant CREATOR_LAUNCH_REWARD = 10_000_000e18;

    /// @notice The minimum order size allowed for trades
    /// @dev Set to 0.0000001 ETH to prevent dust transactions
    uint256 public constant MIN_ORDER_SIZE = 0.0000001 ether;

    /// @notice The total fee percentage in basis points
    /// @dev 100 basis points = 1%
    uint256 public constant TOTAL_FEE_BPS = 100;

    /// @notice The percentage of the total fee allocated to creators
    /// @dev 5000 basis points = 50% of TOTAL_FEE_BPS
    uint256 public constant TOKEN_CREATOR_FEE_BPS = 5000;

    /// @notice The percentage of the total fee allocated to the protocol
    /// @dev 2000 basis points = 20% of TOTAL_FEE_BPS
    uint256 public constant PROTOCOL_FEE_BPS = 2000;

    /// @notice The percentage of the total fee allocated to platform referrers
    /// @dev 1500 basis points = 15% of TOTAL_FEE_BPS
    uint256 public constant PLATFORM_REFERRER_FEE_BPS = 1500;

    /// @notice The percentage of the total fee allocated to trade referrers
    /// @dev 1500 basis points = 15% of TOTAL_FEE_BPS
    uint256 public constant TRADE_REFERRER_FEE_BPS = 1500;

    /// @notice The percentage of the LP fee allocated to creators
    /// @dev 5000 basis points = 50% of the 1% LP FEE
    uint256 public constant CREATOR_MARKET_REWARD_BPS = 5000;

    /// @notice The percentage of the LP fee allocated to platform referrers
    /// @dev 2500 basis points = 25% of the 1% LP FEE
    uint256 public constant PLATFORM_REFERRER_MARKET_REWARD_BPS = 2500;

    /// @notice The percentage of the LP fee allocated to the Doppler protocol
    /// @dev 500 basis points = 5% of the 1% LP FEE
    uint256 public constant DOPPLER_MARKET_REWARD_BPS = 500;

    int24 internal constant DEFAULT_DISCOVERY_TICK_LOWER = -777000;
    int24 internal constant DEFAULT_DISCOVERY_TICK_UPPER = 222000;
    uint16 internal constant DEFAULT_NUM_DISCOVERY_POSITIONS = 10; // will be 11 total with tail position
    uint256 internal constant DEFAULT_DISCOVERY_SUPPLY_SHARE = 0.495e18; // half of the 990m total pool supply
}
