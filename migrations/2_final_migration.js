var SecurityTokenManager = artifacts.require("./SecurityTokenManager.sol");

module.exports = function(deployer) {
  deployer.deploy(SecurityTokenManager);
};
