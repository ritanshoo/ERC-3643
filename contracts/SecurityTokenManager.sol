// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

import './registry/ClaimTopicsRegistry.sol';
import './registry/TrustedIssuersRegistry.sol';
import './registry/IdentityRegistryStorage.sol';
import './registry/IdentityRegistry.sol';
import './token/Token.sol';
import './compliance/DefaultCompliance.sol';

contract SecurityTokenManager {
    function deployClaimTopicsRegistry() external returns (address) {
        return address(new ClaimTopicsRegistry());
    }

    function deployTrustedIssuersRegistry() external returns (address) {
        return address(new TrustedIssuersRegistry());
    }

    function deployIdentityRegistryStorage() external returns (address) {
        return address(new IdentityRegistryStorage());
    }

    function deployIdentityRegistry(
        address _trustedIssuersRegistry,
        address _claimTopicsRegistry,
        address _identityRegistryStorage
    ) external returns (address) {
        return address(new IdentityRegistry(_trustedIssuersRegistry, _claimTopicsRegistry, _identityRegistryStorage));
    }

    function deployCompliance() external returns (address) {
        return address(new DefaultCompliance());
    }

    function deploySecurityToken() external returns (address) {
        return address(new Token());
    }
}
