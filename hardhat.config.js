require('dotenv').config();
require('@nomiclabs/hardhat-waffle');

module.exports = {
  solidity: '0.8.4',
  paths:{
    artifacts: './src/artifacts',
  },
  networks:{
    hardhat:{
      chainId: 1337,
    },
    ropsten:{
      url: 'https://eth-ropsten.alchemyapi.io/v2/ae3q4fCj9fbM0ZeecdrjNwycxJAMir7b',
      accounts: [`0x${process.env.PRIVATE_KEY}`]
    }
  }
}