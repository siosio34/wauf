import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from "dotenv";

dotenv.config();

const config: HardhatUserConfig = {
  solidity: "0.8.18",
  networks: {
    hardhat: {
      forking: {
        url: "https://testnet.aurora.dev/",
      },
      blockGasLimit: 0x1fffffffffff,
      gasPrice: 0,
      initialBaseFeePerGas: 0,
      allowUnlimitedContractSize: true,
    },
    localhost: {
      accounts:
        process.env.PRIVATE_KEY !== undefined ?
        [
          process.env.PRIVATE_KEY,
          process.env.PV_1,
          process.env.PV_2,
          process.env.PV_3,
          process.env.PV_4,
          process.env.PV_5,
          process.env.PV_6
        ] : [],
    },
    aurora_test: {
      url: process.env.AURORA_TESTNET_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? 
        [
          process.env.PRIVATE_KEY,
          process.env.PV_1,
          process.env.PV_2,
          process.env.PV_3,
          process.env.PV_4,
          process.env.PV_5,
          process.env.PV_6
        ] : [],
    },
    gnosis: {
      url: process.env.GNOSIS_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? 
        [
          process.env.PRIVATE_KEY,
          process.env.PV_1,
          process.env.PV_2,
          process.env.PV_3,
          process.env.PV_4,
          process.env.PV_5,
          process.env.PV_6
        ] : [],
    },
    gnosis_test: {
      url: process.env.GNOSIS_TESTNET_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? 
        [
          process.env.PRIVATE_KEY,
          process.env.PV_1,
          process.env.PV_2,
          process.env.PV_3,
          process.env.PV_4,
          process.env.PV_5,
          process.env.PV_6
        ] : [],
    }
  }
};

export default config;
