import { alchemy, ethers } from "./provider/provider";

import ERC20Abi from './abi/ERC20.json';

async function main() {
  const provider = await alchemy.config.getProvider();
  const txReceipt = await provider.getTransactionReceipt('0xe3ad90368b7cada9ae05741260a4bfea2b27516208225917d150f4cfcd5b649f');
  const transferInterface = new ethers.utils.Interface(ERC20Abi);

  // just so happens that this transaction only has 1 log, there may be more
  txReceipt.logs.forEach((log) => {
    const parsedLog = transferInterface.parseLog(log);
    const { value } = parsedLog.args;
    const amount = ethers.utils.formatUnits(value, 6) // 6 because USDT has 6 decimals
    console.log(amount)
  })
}

main().catch(console.log);