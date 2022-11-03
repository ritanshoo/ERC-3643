const Identity = artifacts.require('@onchain-id/solidity/contracts/Identity.sol');
const IdentityImplementation = artifacts.require('@onchain-id/solidity/contracts/proxy/ImplementationAuthority.sol');
const onchainid = require('@onchain-id/solidity');
const {
    Proxy,
    Token,
    
} = require("./artifacts")

const tokenProxyABI = [
    {
        inputs: [
            {
                internalType: "address",
                name: "_implementationAuthority",
                type: "address"
            },
            {
                internalType: "address",
                name: "_identityRegistry",
                type: "address"
            },
            {
                internalType: "address",
                name: "_compliance",
                type: "address"
            },
            {
                internalType: "string",
                name: "_name",
                type: "string"
            },
            {
                internalType: "string",
                name: "_symbol",
                type: "string"
            },
            {
                internalType: "uint8",
                name: "_decimals",
                type: "uint8"
            },
            {
                internalType: "address",
                name: "_onchainID",
                type: "address"
            }
        ],
        stateMutability: "nonpayable",
        type: "constructor"
    },
    {
        stateMutability: "payable",
        type: "fallback"
    },
    {
        inputs: [],
        name: "implementationAuthority",
        outputs: [
            {
                internalType: "address",
                name: "",
                type: "address"
            }
        ],
        stateMutability: "view",
        type: "function"
    }
]

const tokenProxyBytecode = "0x608060405234801561001057600080fd5b5060405161057f38038061057f83398101604081905261002f91610289565b600080546001600160a01b0319166001600160a01b03891690811782556040805163557887a160e11b8152905163aaf10f42916004808201926020929091908290030181865afa158015610087573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906100ab9190610348565b90506000816001600160a01b03168888888888886040516024016100d496959493929190610396565b60408051601f198184030181529181526020820180516001600160e01b0316633e46d86760e21b1790525161010991906103f1565b600060405180830381855af49150503d8060008114610144576040519150601f19603f3d011682016040523d82523d6000602084013e610149565b606091505b505090508061019e5760405162461bcd60e51b815260206004820152601660248201527f496e697469616c697a6174696f6e206661696c65642e00000000000000000000604482015260640160405180910390fd5b50505050505050505061040d565b80516001600160a01b03811681146101c357600080fd5b919050565b634e487b7160e01b600052604160045260246000fd5b60005b838110156101f95781810151838201526020016101e1565b50506000910152565b600082601f83011261021357600080fd5b81516001600160401b038082111561022d5761022d6101c8565b604051601f8301601f19908116603f01168101908282118183101715610255576102556101c8565b8160405283815286602085880101111561026e57600080fd5b61027f8460208301602089016101de565b9695505050505050565b600080600080600080600060e0888a0312156102a457600080fd5b6102ad886101ac565b96506102bb602089016101ac565b95506102c9604089016101ac565b60608901519095506001600160401b03808211156102e657600080fd5b6102f28b838c01610202565b955060808a015191508082111561030857600080fd5b506103158a828b01610202565b93505060a088015160ff8116811461032c57600080fd5b915061033a60c089016101ac565b905092959891949750929550565b60006020828403121561035a57600080fd5b610363826101ac565b9392505050565b600081518084526103828160208601602086016101de565b601f01601f19169290920160200192915050565b600060018060a01b038089168352808816602084015260c060408401526103c060c084018861036a565b83810360608501526103d2818861036a565b60ff969096166080850152509290921660a09091015250949350505050565b600082516104038184602087016101de565b9190910192915050565b6101638061041c6000396000f3fe60806040526004361061001e5760003560e01c80632307f882146100c1575b60008060009054906101000a90046001600160a01b03166001600160a01b031663aaf10f426040518163ffffffff1660e01b8152600401602060405180830381865afa158015610072573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061009691906100fd565b90503660008037600080366000846127105a03f43d806000803e8180156100bc57816000f35b816000fd5b3480156100cd57600080fd5b506000546100e1906001600160a01b031681565b6040516001600160a01b03909116815260200160405180910390f35b60006020828403121561010f57600080fd5b81516001600160a01b038116811461012657600080fd5b939250505056fea2646970667358221220ab540377b8877310b572aa3ea578553316cbeb1b0e818d8b0e44da718a37d03064736f6c63430008110033gg";



async function deployTokenProxy(data, identityIssuer) {
    // const token = await Token.new();
    // console.log(tokenProxyBytecode)
    // console.log(Token)
    console.log(data)
    const { _implementationAuthority, _identityRegistry, _compliance, _name, _symbol, _decimals, _onchainID } = data
    const contractTokenProxy = new web3.eth.Contract(tokenProxyABI);

    const proxy = contractTokenProxy.deploy({
        data: Proxy.bytecode,
        arguments: [_implementationAuthority, _identityRegistry, _compliance, _name, _symbol, _decimals, _onchainID]
    }).send({
        from: identityIssuer,
        gas: 3000000,
        gasPrice: '344631816',
    }).then(
        (newContractInstance) => newContractInstance.options.address, // instance with the new contract address
    );
    return Token.at(await proxy);
}

module.exports = {
    deployTokenProxy,
};
