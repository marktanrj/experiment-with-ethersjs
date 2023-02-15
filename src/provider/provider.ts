require('dotenv').config();
import { Network, Alchemy } from 'alchemy-sdk';
import { ethers } from 'ethers';

const settings = {
  apiKey: process.env.ALCHEMY_KEY,
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

const ethersProvider = new ethers.providers.JsonRpcProvider(process.env.ANKR_URL);

export {
  ethers,
  alchemy,
  ethersProvider,
}