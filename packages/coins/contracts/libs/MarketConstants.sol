// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

library MarketConstants {
    /// @dev Constant used to increase precision during calculations
    uint256 constant WAD = 1e18;

    /// @notice The LP fee
    /// @dev 30000 basis points = 3%
    uint24 internal constant LP_FEE_V4 = 30000;

    /// @notice The spacing for 1% pools
    /// @dev 200 ticks
    int24 internal constant TICK_SPACING = 200;
}
