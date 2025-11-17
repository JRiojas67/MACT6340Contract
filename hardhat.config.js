require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;
const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY;

// change these for different networks
const ALCHEMY_URL = 'https://polygon-mumbai.g.alchemy.com/v2/${ALCHEMY_API_KEY}';
// const ALCHEMY_URL = 'https://polygon-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}';
// const ALCHEMY_URL = 'https://eth-sepolia.g.alchemy.com/v2/${ALCHEMY_API_KEY}';
// const ALCHEMY_URL = 'https://eth-mainnet.alchemyapi.io/v2/${ALCHEMY_API_KEY}';


const STUNT_WALLET_PRIVATE_KEY = process.env.STUNT_WALLET_PRIVATE_KEY;
const COINMAKERCAP_API_KEY = process.env.COINMAKERCAP_API_KEY;

module.exports = {
    etherscan: {
        apiKey: {
        mainnet: ETHERSCAN_API_KEY,
        sepolia: ETHERSCAN_API_KEY,
        polygon: POLYGONSCAN_API_KEY,
        polygonMumbai: POLYGONSCAN_API_KEY,
        }, 
    },
    gasReport: {
        enabled: process.env.REPORT_GAS ? true : false ,
        currency: "USD",
        coinmakercap: COINMAKERCAP_API_KEY,
        token: "MATIC",
        outputFile: "gas-report.txt",
        noColors: true,
    },

    defaultNetwork: "polygonMumbai", // hardhat for testing, change this for different networks
    networks: {
        hardhat: {
            chainId: 31337,
        },
        polygonMumbai: {
            url: ALCHEMY_URL,
            accounts: [STUNT_WALLET_PRIVATE_KEY],
            gasPrice: 35000000000,
            chainId: 80001,
        },
        polygon: {
            url: ALCHEMY_URL,
            accounts: [STUNT_WALLET_PRIVATE_KEY],
            gasPrice: 35000000000,
            chainId: 137,
        },
        sepolia: {
            url: ALCHEMY_URL,
            accounts: [STUNT_WALLET_PRIVATE_KEY],
            gasPrice: 30000000000,
            chainId: 11155111,
        },
        ethereum: {
            url: ALCHEMY_URL,
            accounts: [STUNT_WALLET_PRIVATE_KEY],
            gasPrice: 35000000000,
            chainId: 1,
        },
    },
    solidity: {
        version: "0.8.27", //use an exact verion here and in the contracts to avoid verification problems
        settings: {
            optimizer: {
                enabled: false , // may cause verification problems if true
            },
        },
    },
    path: {
        sources: "./contracts",
        tests: "./test",
        cache: "./cache",
        artifacts: "./artifacts",
    },
};