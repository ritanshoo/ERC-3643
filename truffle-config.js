const solcStable = {
  version: '^0.8.0',
  settings: {
    optimizer: {
      enabled: true,
      runs: 200,
    },
  },
};

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*", // Match any network id
    },
    coverage: {
      host: 'localhost',
      network_id: '*',
      port: 8555,
      gas: 4500000,
      gasPrice: 100000000000,
    },
  },
  solc: {
    optimizer: {
        enabled: true,
        runs: 200
    }
},
  compilers: {
    solc: solcStable,
  },
  mocha: {
    reporter: 'eth-gas-reporter',
    reporterOptions: { outputFile: './gas-report' },
  },
  plugins: ['solidity-coverage'],
};
