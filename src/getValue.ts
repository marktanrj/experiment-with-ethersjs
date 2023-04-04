import { alchemy, ethers } from "./provider/provider";

import ERC20Abi from './abi/ERC20.json';

async function main() {
  const provider = await alchemy.config.getProvider();

  // method 1
  // const txReceipt = await provider.getTransactionReceipt('0xe3ad90368b7cada9ae05741260a4bfea2b27516208225917d150f4cfcd5b649f');
  // const transferInterface = new ethers.utils.Interface(ERC20Abi);

  // // just so happens that this transaction only has 1 log, there may be more
  // txReceipt.logs.forEach((log) => {
  //   const parsedLog = transferInterface.parseLog(log);
  //   const { value } = parsedLog.args;
  //   const amount = ethers.utils.formatUnits(value, 6) // 6 because USDT has 6 decimals
  //   console.log(amount)
  // })

  // method 2
  const inter = new ethers.utils.Interface(ERC20Abi);
  const tx = await provider.getTransaction('0xe3ad90368b7cada9ae05741260a4bfea2b27516208225917d150f4cfcd5b649f');
  const decodedInput = inter.parseTransaction({ data: tx.data, value: tx.value});

  console.log({
    function_name: decodedInput.name,
    from: tx.from,
    to: decodedInput.args[0],
    erc20Value: ethers.utils.formatUnits(decodedInput.args[1], 6) // 6 because USDT has 6 decimals
  });  
}

main().catch(console.log);