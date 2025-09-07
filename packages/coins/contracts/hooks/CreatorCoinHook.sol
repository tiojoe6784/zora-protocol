// SPDX-License-Identifier: ZORA-DELAYED-OSL-v1
// This software is licensed under the Zora Delayed Open Source License.
// Under this license, you may use, copy, modify, and distribute this software for
// non-commercial purposes only. Commercial use and competitive products are prohibited
// until the "Open Date" (3 years from first public distribution or earlier at Zora's discretion),
// at which point this software automatically becomes available under the MIT License.
// Full license terms available at: https://docs.zora.co/coins/license
pragma solidity ^0.8.28;

import {CreatorCoinConstants} from "../libs/CreatorCoinConstants.sol";
import {CreatorCoinRewards} from "../libs/CreatorCoinRewards.sol";
import {IPoolManager, IDeployedCoinVersionLookup, IHasRewardsRecipients, Currency, BaseZoraV4CoinHook} from "./BaseZoraV4CoinHook.sol";
import {IHooksUpgradeGate} from "../interfaces/IHooksUpgradeGate.sol";

contract CreatorCoinHook is BaseZoraV4CoinHook {
    constructor(
        IPoolManager poolManager_,
        IDeployedCoinVersionLookup coinVersionLookup_,
        address[] memory trustedMessageSenders_,
        IHooksUpgradeGate upgradeGate
    ) BaseZoraV4CoinHook(poolManager_, coinVersionLookup_, trustedMessageSenders_, upgradeGate, CreatorCoinConstants.MARKET_SUPPLY) {}

    /// @dev Override for distributing market rewards and vested coins to the creator
    function _distributeMarketRewards(Currency currency, uint128 fees, IHasRewardsRecipients coin, address) internal override {
        CreatorCoinRewards.distributeMarketRewards(currency, fees, coin);
    }
}
