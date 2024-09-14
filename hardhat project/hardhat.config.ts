import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.19",
  networks: {
    taiko: {
      url: `https://rpc.jolnir.taiko.xyz`,
      accounts: {
        mnemonic: 'harvest betray eagle save evidence entire artefact loan lunch ivory letter more', // для мнемоники или приваткея 
      },
    },
    scroll: {
      url: `https://sepolia-rpc.scroll.io/`,
      accounts: {
        mnemonic: 'harvest betray eagle save evidence entire artefact loan lunch ivory letter more',
      }
    }   
  },

  // etherscan: {
  //   //apiKey: "8PY7RIC355XTCBH6EANMKRDA4KYKNMMKWQ",  // для верификации
  //     apiKey: {
  //       scrollSepolia: 'abc',
  //     },
  //     customChains: [
  //       {
  //         network: 'scrollSepolia',
  //         chainId: 534351,
  //         urls: {
  //           apiURL: 'https://sepolia-blockscout.scroll.io/api',
  //           browserURL: 'https://sepolia-blockscout.scroll.io/',
  //         },
  //       },
  //     ],
  //   },
  etherscan: {
    apiKey: {
        taiko: "42069",
    },
    customChains: [
        {
            network: "taiko",
            chainId: 167007,
            urls: {
                apiURL: "https://blockscoutapi.jolnir.taiko.xyz/api",
                browserURL: "https://explorer.jolnir.taiko.xyz",
            },
        },
    ],
  },

};

export default config;
